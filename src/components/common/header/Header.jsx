import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../dataContext/DataContext";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import { firestoreDb, storage } from "../../../firebase/firebase";
import "./header.css";

const Options = () => {
    const {
        tagNames,
        activePage,
        initialImages,
        setPhotos,
        photos,
        videos,
        documents,
        activeTag,
        setActiveTag,
        user,
        setUser,
        setLoggedIn,
    } = useContext(DataContext);
    const [filter, setFilter] = useState("All Files");

    const auth = getAuth();
    const navigate = useNavigate();

    const deleteAccount = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete your account? This action can not be undone"
            )
        ) {
            if (!user) return;

            try {
                await deleteFirestoreData(user.uid);

                await deleteStorageData(user.uid);

                await deleteUser(auth.currentUser);

                setUser(null);
                setLoggedIn(false);
                console.log("user account deleted");
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteFirestoreData = async (uid) => {
        await deleteDoc(doc(firestoreDb, "users", uid));
    };

    const deleteStorageData = async (uid) => {
        const listRef = ref(storage, `user/${uid}`);

        const recursiveDelete = async (folderRef) => {
            const res = await listAll(folderRef);

            // Process all prefixes (sub-folders)
            for (const prefix of res.prefixes) {
                await recursiveDelete(prefix);
            }

            // Process all items (files)
            const deletePromises = res.items.map((itemRef) => {
                console.log(`Deleting storage item: ${itemRef.fullPath}`);
                return deleteObject(itemRef);
            });

            await Promise.all(deletePromises);
        };

        await recursiveDelete(listRef);
    };

    const numOfFiles =
        activePage === "images"
            ? photos.length
            : activePage === "videos"
            ? videos.length
            : documents.length;

    useEffect(() => {
        setActiveTag(filter);
        if (filter !== "All Files") {
            const filtered = initialImages.filter((photo) =>
                photo.tag.includes(filter)
            );
            setPhotos(filtered);
        } else {
            setPhotos(initialImages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    return (
        <div className="header">
            {activePage === "profilePage" || activePage === "uploadPage" ? (
                <>
                    <div>
                        <h3>
                            {activePage === "profilePage"
                                ? "Profile"
                                : "Upload files from your local storage"}
                        </h3>
                    </div>
                    <div>
                        {activePage === "profilePage" ? (
                            <button onClick={deleteAccount}>
                                Delete Account
                            </button>
                        ) : (
                            <button onClick={() => navigate(-1)}>Back</button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="title">
                        <h4>
                            {activePage !== "home"
                                ? `(${numOfFiles} ${activePage})`
                                : "All FIles"}
                        </h4>
                    </div>
                    <div>
                        <Link to={`/upload`}>
                            <button>
                                Add{" "}
                                {activePage !== "home" ? activePage : "Files"}
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Options;
