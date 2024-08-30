import { useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import Header from "../common/header/Header";
import ImageBox from "./ImageBox";

const ImageContainer = ({ tagName }) => {
    const { images } = useContext(DataContext);

    return (
        <div className="imageContainer">
            <Header />
            <div className="images">
                {images.map((image, index) => (
                    <ImageBox key={index} url={image.url} title={image.title} />
                ))}
            </div>
        </div>
    );
};

export default ImageContainer;
