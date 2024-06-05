import { createContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDb, storage } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

//import images
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image5 from "../assets/images/image5.jpg";
import image4 from "../assets/images/image4.jpg";
import image6 from "../assets/images/image6.jpg";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.jpg";
import image9 from "../assets/images/image9.jpg";
import image10 from "../assets/images/image10.jpg";

export const DataContext = createContext();

const initialImages = [
    {
        src: image1,
        tag: "summer",
        title: "image1",
        type: "image"
    },
    {
        src: image2,
        tag: "spring",
        title: "image2",
        type: "image"
    },
    {
        src: image3,
        tag: "winter",
        title: "image3",
        type: "image",
    },
    {
        src: image4,
        tag: "summer",
        title: "image4",
        type: "image"
    },
    {
        src: image5,
        tag: "summer",
        title: "image5",
        type: "image"
    },
    {
        src: image6,
        tag: "spring",
        title: "image6",
        type: "image"
    },
    {
        src: image7,
        tag: "winter",
        title: "image7",
        type: "image"
    },
    {
        src: image8,
        tag: "spring",
        title: "image8",
        type: "image"
    },
    {
        src: image9,
        tag: "winter",
        title: "image9",
        type: "image"
    },
    {
        src: image10,
        tag: "spring",
        title: "image10",
        type: "image"
    },
];

const DataProvider = ({ children }) => {
    const [files, setFiles] = useState([])
    const [activePage, setActivePage] = useState("home");
    const [tagNames, setTagsNames] = useState(["All Files", "summer", "spring", "winter"])
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null);
    const [activeTag, setActiveTag] = useState(tagNames[0]);
    const [profilePicURL, setProfilePicURL] = useState("")
    const auth = getAuth()

    const [userFirstName, setUserFirstName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")

    const [photos, setPhotos] = useState(initialImages);
    const [videos, setVideos] = useState([])
    const [documents, setDocuments] = useState([])

    const totalFiles = initialImages.length

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
                // unsubscribe();
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

            console.log(profileRef)

            getDownloadURL(profileRef).then((url) => {
                setProfilePicURL(url)
            }).catch((error) => {
                // alert("Unable to fetch profile picture, Please reload")
            })
        }

        user && getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    console.log(user?.displayName)

    return <DataContext.Provider value={{
        activeTag, setActiveTag, initialImages, totalFiles, user, setUser, loggedIn, setLoggedIn, videos, documents, photos, setPhotos, files, setFiles, tagNames, setTagsNames, handleTags, handleRenameTag, activePage, setActivePage, userFirstName, userLastName, userEmail, profilePicURL, setProfilePicURL
    }}>
        {children}
    </DataContext.Provider>
}

export default DataProvider