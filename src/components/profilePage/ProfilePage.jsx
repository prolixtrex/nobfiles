import { useState, useEffect, useContext, useRef } from "react";
import Header from "../common/Header";
import { DataContext } from "../../dataContext/DataContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { getAuth, updateProfile, updatePassword, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./profilePage.css";

import ProfilePic from "./ProfilePic";
import ProfileInfo from "./ProfileInfo";
import PasswordZone from "./PasswordZone";

const ProfilePage = () => {
    const {
        setActivePage,
        userFirstName,
        userLastName,
        userEmail,
        profilePicURL,
        setProfilePicURL,
        setUser,
        setLoggedIn,
    } = useContext(DataContext);
    const [editInfo, setEditInfo] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [firstName, setFirstName] = useState(userFirstName);
    const [lastName, setLastName] = useState(userLastName);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMissmatch, setPasswordMissmatch] = useState("");
    const pictureRef = useRef(null);
    const auth = getAuth();

    const navigate = useNavigate();

    // Create a child reference
    const imagesRef = ref(storage, "images");
    // imagesRef now points to 'images'

    useEffect(() => {
        setActivePage("profilePage");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveEditInfo = () => {
        setEditInfo(false);
    };

    const cancelEdit = (caller) => {
        if (caller === "info") {
            setFirstName(userFirstName);
            setLastName(userLastName);
            setEditInfo(false);
        }

        if (caller === "password") {
            setNewPassword("");
            setConfirmPassword("");
            setEditPassword(false);
        }
    };

    const savePassword = () => {
        if (newPassword === confirmPassword) {
            updatePassword(auth.currentUser, newPassword).then(() => {
                // alert("Your password has been changed successfully");
                signOut(auth)
                    .then(() => {
                        setUser(null);
                        setLoggedIn(false);
                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        } else {
            setPasswordMissmatch("Your passwords do not match");
            return false;
        }
    };

    const editingPassword = (e, password) => {
        setPasswordMissmatch("");
        if (password === "newPassword") {
            setNewPassword(e.target.value);
        }
        if (password === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
    };

    const changeProfilePicture = () => {
        pictureRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            const storageRef = ref(
                storage,
                `user/${auth.currentUser.uid}/profilePicture/profilePicture`
            );
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`upload is ${progress}% done`);
                    file = null;
                },
                (error) => {
                    console.error("Upload error", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            updateProfile(auth.currentUser, {
                                photoURL: downloadURL,
                            })
                                .then(() => {
                                    setProfilePicURL(downloadURL);
                                })
                                .catch((error) => {
                                    console.log(
                                        "error updating profile picture",
                                        error
                                    );
                                });
                        }
                    );
                }
            );
        }
    };

    return (
        <div className="main profilePage">
            <Header />
            <div className="profileWrapper">
                <ProfilePic
                    {...{
                        profilePicURL,
                        pictureRef,
                        handleFileChange,
                        changeProfilePicture,
                    }}
                />
                <ProfileInfo
                    {...{
                        editInfo,
                        userFirstName,
                        userLastName,
                        firstName,
                        setFirstName,
                        lastName,
                        setLastName,
                        userEmail,
                        cancelEdit,
                        saveEditInfo,
                        setEditInfo,
                    }}
                />
                <PasswordZone
                    {...{
                        editPassword,
                        passwordMissmatch,
                        newPassword,
                        editingPassword,
                        confirmPassword,
                        cancelEdit,
                        savePassword,
                        setEditPassword,
                        setPasswordMissmatch,
                    }}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
