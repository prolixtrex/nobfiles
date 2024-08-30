import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../../dataContext/DataContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import Header from "../header/Header";
import "./uploadPage.css";

const UploadPage = () => {
    const { setActivePage, user, uploadFileType, setImageURL } =
        useContext(DataContext);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [progresses, setProgresses] = useState([]);

    useEffect(() => {
        setActivePage("uploadPage");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const filePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews(filePreviews);

        const initialProgress = files.map(() => 0);
        setProgresses(initialProgress);
    };

    const handleUpload = () => {
        images.forEach((image, index) => {
            const storageRef = ref(
                storage,
                `user/${user.uid}/images/${image.name}`
            );

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    setProgresses((prevState) => {
                        const newProgresses = [...prevState];
                        newProgresses[index] = progress;
                        return newProgresses;
                    });
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setImageURL(downloadURL);
                            setPreviews((prevState) => {
                                const newPreviews = [...prevState];
                                newPreviews[index] = downloadURL;
                                return newPreviews;
                            });
                        }
                    );
                }
            );
        });
    };

    return (
        <main className="main uploadPage">
            <Header />
            <div className="uploadPage">
                <div id="header">
                    <h4>Select files to upload</h4>
                </div>
                <div className="preview">
                    {previews.length < 1 ? (
                        <p
                            style={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            your preview will appear here
                        </p>
                    ) : (
                        previews.map((preview, i) => (
                            <div
                                key={i}
                                style={{
                                    position: "relative",
                                    width: "100px",
                                }}
                            >
                                <img
                                    src={preview}
                                    alt={`img-${i}`}
                                    style={{
                                        width: "100%",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: 10,
                                        opacity: progresses[i] < 100 ? 0.5 : 1,
                                    }}
                                />
                                <progress
                                    value={progresses[i]}
                                    max="100"
                                    style={{
                                        position: "absolute",
                                        bottom: 2,
                                        left: 0,
                                        width: "100%",
                                        height: "20px",
                                        display:
                                            progresses[i] === 100 && "none",
                                    }}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="browse">
                    <input
                        type="file"
                        multiple
                        id="choose-file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="choose-file" className="choose-file">
                        Select {uploadFileType} to upload
                    </label>
                    <button className="button" onClick={handleUpload}>
                        Upload
                    </button>
                </div>
                <div className="infos">
                    <div>
                        File name: <input type="text" />
                    </div>
                    <div className="tag">
                        Tag: <input type="text" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UploadPage;
