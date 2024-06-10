import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../dataContext/DataContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestoreDb, storage } from "../../firebase/firebase";
import { getAuth, updateProfile, updatePassword, signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Header from "../common/header/Header";
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
        user,
        userDisplayName,
        loading,
        setLoading,
    } = useContext(DataContext);
    const [editInfo, setEditInfo] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [firstName, setFirstName] = useState(userFirstName);
    const [lastName, setLastName] = useState(userLastName);
    const [displayName, setDisplayName] = useState(userDisplayName);
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

    const saveEditInfo = async () => {
        const infoRef = doc(firestoreDb, "users", user.uid);
        setLoading("infoUpdate");

        try {
            await updateDoc(infoRef, {
                firstName: firstName,
                lastName: lastName,
            });
            await updateProfile(user, { displayName });
        } catch (error) {
            console.log(error);
        } finally {
            setEditInfo(false);
            setLoading(null);
        }
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
            setLoading("passwordUpdate");
            updatePassword(auth.currentUser, newPassword).then(() => {
                // alert("Your password has been changed successfully");
                signOut(auth)
                    .then(() => {
                        setUser(null);
                        setLoggedIn(false);
                        navigate("/");
                        setLoading(null);
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
                    setLoading("profilePic");
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
                                    setLoading(null);
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
                        loading,
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
                        userDisplayName,
                        displayName,
                        setDisplayName,
                        loading,
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
                        loading,
                    }}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
