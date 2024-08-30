import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../dataContext/DataContext";
import "./viewer.css";

const Viewer = () => {
    const { title } = useParams();
    const { images } = useContext(DataContext);
    const navigate = useNavigate();

    const back = () => navigate(-1);

    const image = images.find((image) => image.title === title);

    return (
        <div className="viewer">
            <div className="viewer-header">
                <button onClick={back}>Back</button>
                <p>{image?.title}</p>
                {/* <p>{image?.tag}</p> */}
            </div>
            <div className="viewer-image">
                <img src={image?.url} alt={image?.title} />
            </div>
        </div>
    );
};

export default Viewer;
