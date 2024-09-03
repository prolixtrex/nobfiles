import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../dataContext/DataContext";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./viewer.css";
import Alert from "../common/alert/Alert";

const Viewer = () => {
    const { title } = useParams();
    const { images, setImages, setAlertMessage, alertMessage, user } =
        useContext(DataContext);
    const [action, setAction] = useState(null);
    const [resp, setResp] = useState("");
    const [image, setImage] = useState(
        images.find((image) => image.title === title)
    );

    const navigate = useNavigate();
    const storage = getStorage();

    const currentPosition = images.indexOf(image);
    const nextImage = images[(currentPosition + 1) % images.length];
    const prevImage =
        images[(currentPosition - 1 + images.length) % images.length];

    const back = () => navigate(-1);

    const confirmDelete = () => {
        setAlertMessage(
            <>
                Are you sure you want to delete
                <br />
                {image.title}
            </>
        );
        setAction("delete image");
    };

    const navigatePix = (dir) => {
        if (dir === "next") {
            setImage(nextImage);
        } else if (dir === "prev") {
            setImage(prevImage);
        }
    };

    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.key === "ArrowRight") {
                navigatePix("next");
            } else if (e.key === "ArrowLeft") {
                navigatePix("prev");
            }
        };

        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [currentPosition, images]);

    useEffect(() => {
        if (resp === "delete image") {
            const imageRef = ref(storage, `user/${user.uid}/images/${title}`);
            deleteObject(imageRef)
                .then(() => {
                    const newImages = images.filter(
                        (img) => img.title !== title
                    );
                    setImages(newImages);
                    setImage(
                        newImages[currentPosition % newImages.length] ||
                            newImages[0]
                    );
                    setAction("");
                    setAlertMessage("");
                })
                .catch(() => [
                    setAlertMessage(`Error deleting the image. Try again`),
                ]);
        }
    }, [resp, images]);

    return (
        <div className="viewer">
            {alertMessage && <Alert {...{ action, setResp }} />}
            <div className="viewer-header">
                <button onClick={back}>Back</button>
                {image && (
                    <>
                        <p>{image.title}</p>
                        <button onClick={confirmDelete}>Delete</button>
                    </>
                )}
            </div>
            <div className="viewer-body">
                <button onClick={() => navigatePix("prev")}>
                    <FaChevronLeft />
                </button>
                <img src={image?.url} alt={image?.title} />
                <button onClick={() => navigatePix("next")}>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Viewer;
