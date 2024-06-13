import { useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { TouchBackend } from "react-dnd-touch-backend";
import Header from "../common/header/Header";
import ImageBox from "./ImageBox";

const ImageContainer = ({ tagName }) => {
    const { photos } = useContext(DataContext);
    // const [isTouchDevice, setIsTouchDevice] = useState(false);
    // const isTouchDevice = "ontouchstart" in window;

    // const moveImage = (fromIndex, toIndex) => {
    //     const updatedImages = [...photos];
    //     const [movedImage] = updatedImages.splice(fromIndex, 1);
    //     updatedImages.splice(toIndex, 0, movedImage);
    //     setPhotos(updatedImages);
    // };

    // useEffect(()=> {
    //     const detectDevice = () => {
    //         if("ontouchstart" in window || )
    //     }
    // })

    return (
        // <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
        <div className="imageContainer">
            <Header />
            <div className="images">
                {photos.map((photo, index) => (
                    <ImageBox
                        key={index}
                        // moveImage={moveImage}
                        index={index}
                        src={photo.src}
                        title={photo.title}
                        tag={photo.tag}
                    />
                ))}
            </div>
        </div>
        // </DndProvider>
    );
};

export default ImageContainer;
