import { useContext } from "react";
// import ImageUpload from "./ImageUpload";
import { DataContext } from "../../dataContext/DataContext";
import { Link } from "react-router-dom";
import noban from "../../assets/logo/noban.png";

const Profile = () => {
    const { files, totalFiles, userFirstName } = useContext(DataContext);

    return (
        <div className="profile">
            <Link to="/profilePage">
                <div className="profilePix">
                    <img src={noban} alt="noban logo" />
                </div>
                <div>
                    {userFirstName ? (
                        <h1>{userFirstName}</h1>
                    ) : (
                        <h1>Nob Files</h1>
                    )}
                </div>
            </Link>
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
