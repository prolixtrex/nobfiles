import { useContext, useEffect } from "react";
import { DataContext } from "../../dataContext/DataContext";
import ImageContainer from "./ImageContainer";
import "./images.css";

const ImageGallery = () => {
    const { tagNames, setActiveCat } = useContext(DataContext);

    useEffect(() => {
        setActiveCat("images");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="main">
            {/* map of individual image container according to tags */}
            {/* {tagNames.map((tagName, index) => (
                <ImageContainer key={index} {...{ tagName }} />
            ))} */}
            <ImageContainer />
        </main>
    );
};

export default ImageGallery;
