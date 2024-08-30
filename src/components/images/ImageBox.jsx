// import { useContext } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { DataContext } from "../../dataContext/DataContext";
import { Link } from "react-router-dom";

const ImageBox = ({ title, url }) => {
    // const { loggedIn } = useContext(DataContext);

    // const [, ref] = useDrag({
    //     type: "IMAGE",
    //     item: { index },
    // });

    // const [, drop] = useDrop({
    //     accept: "IMAGE",
    //     hover: (draggedImage) => {
    //         if (draggedImage.index !== index) {
    //             moveImage(draggedImage.index, index);
    //             draggedImage.index = index;
    //         }
    //     },
    // });

    return (
        <Link
            to={`/${title}`}
            // ref={(node) => loggedIn && ref(drop(node))}
            className="imageBox"
        >
            <img src={url} alt={title} />
            <div className="imageInfo">
                <p>{title}</p>
                {/* <p>{tag}</p> */}
            </div>
        </Link>
    );
};

export default ImageBox;
