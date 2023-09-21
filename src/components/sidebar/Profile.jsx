import { useContext } from "react";
// import ImageUpload from "./ImageUpload";
import { DataContext } from "../../dataContext/DataContext";
import { Link } from "react-router-dom";
import noban from "../../assets/logo/noban.png";

const Profile = () => {
    const { files, totalFiles } = useContext(DataContext);

    return (
        <div className="profile">
            <div className="profilePix">
                <img src={noban} alt="noban logo" />
            </div>
            <div>
                <h1>Nob Files</h1>
            </div>
            <div>
                <p>{totalFiles} files</p>
            </div>
            <div className="upload">
                <Link to={`/upload`}>
                    <button type="button">UPLOAD</button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
