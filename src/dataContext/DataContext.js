import { createContext, useState, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestoreDb, storage } from "../firebase/firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [files, setFiles] = useState([])
    const [activePage, setActivePage] = useState("home");
    const [tagNames, setTagsNames] = useState(["All Files", "summer", "spring", "winter"])
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null);
    const [activeTag, setActiveTag] = useState(tagNames[0]);
    const [profilePicURL, setProfilePicURL] = useState("")
    const [loading, setLoading] = useState(null); //string values
    const [alertMessage, setAlertMessage] = useState("")
    const [alertResp, setAlertResp] = useState(false)
    const auth = getAuth()

    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userDisplayName, setUserDisplayName] = useState("")

    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])
    const [documents, setDocuments] = useState([])

    const [uploadFileType, setUploadFileType] = useState("")

    const totalFiles = images.length

    const handleTags = (action, name) => {
        action === "add" && tagNames.push(name)
        if (action === "delete") {
            const newTags = tagNames.splice(0, (tagNames.indexOf(name))).concat(tagNames.splice(tagNames.indexOf(name) + 1))
            setTagsNames(newTags)
        }
    }

    const handleRenameTag = (oldName, newName) => {
        tagNames[tagNames.indexOf(oldName)] = newName
    };

    const loadImages = () => {
        // const allItems = [];
        const imageRef = ref(storage, `user/${auth.currentUser.uid}/images`)
        listAll(imageRef).then((res) => {
            const imagePromises = res.items.map((item) => {
                return getDownloadURL(item).then((url) => {
                    const title = item.name
                    return { url, title }
                })
            })

            Promise.all(imagePromises).then((images) => {
                setImages(images)
            }).catch((error) => {
                console.error("Failed to load image", error)
            })
        })
    }

    useEffect(() => {
        const getData = async () => {
            setLoggedIn(true)
            const docRef = doc(firestoreDb, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const profileRef = ref(storage, `user/${auth.currentUser.uid}/profilePicture/profilePicture`)

            if (docSnap.exists()) {
                const userData = docSnap.data()
                setUserFirstName(userData.firstName)
                setUserLastName(userData.lastName)
                setUserEmail(user.email)
                setUserDisplayName(user.displayName)
                // unsubscribe();
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

            getDownloadURL(profileRef).then((url) => {
                setProfilePicURL(url)
            }).catch((error) => {
                // alert("Unable to fetch profile picture, Please reload")
            })

            loadImages();

        }

        if (user) {
            getData();
            const unsubFirestore = onSnapshot(doc(firestoreDb, "users", user.uid), (doc) => {
                const userData = doc.data()
                setUserFirstName(userData?.firstName)
                setUserLastName(userData?.lastName)
            });

            const unsubAuth = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserDisplayName(user?.displayName);
                } else {
                    setUserDisplayName(null)
                }
            });
            return () => {
                unsubFirestore();
                unsubAuth();
            }
        }
    }, [user, auth])

    return <DataContext.Provider value={{
        activeTag, setActiveTag, totalFiles, user, setUser, loggedIn, setLoggedIn, videos, documents, files, setFiles, tagNames, setTagsNames, handleTags, handleRenameTag, activePage, setActivePage, userFirstName, userLastName, userEmail, profilePicURL, setProfilePicURL, userDisplayName, loading, setLoading, uploadFileType, setUploadFileType, images, setImages, alertMessage, setAlertMessage
    }}>
        {children}
    </DataContext.Provider>
}

export default DataProvider