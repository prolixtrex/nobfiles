import { Link } from "react-router-dom";

const ImageBox = ({ title, url }) => {
    return (
        <Link to={`/${title}`} className="imageBox">
            <img src={url} alt={title} />
            <div className="imageInfo">
                <p>{title}</p>
                {/* <p>{tag}</p> */}
            </div>
        </Link>
    );
};

export default ImageBox;
