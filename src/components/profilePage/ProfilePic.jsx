import { IoPersonCircleSharp } from "react-icons/io5";
import LoadingIndicator from "../common/loading/LoadingIndicator";

const ProfilePic = ({
    profilePicURL,
    pictureRef,
    handleFileChange,
    changeProfilePicture,
    loading,
}) => {
    return (
        <div className="profilePic">
            <div className="imageWrapper">
                {loading === "profilePic" ? (
                    <LoadingIndicator />
                ) : profilePicURL ? (
                    <img className="avater" src={profilePicURL} alt="profile" />
                ) : (
                    <IoPersonCircleSharp className="avater" />
                )}
            </div>
            <div className="changePic">
                <input
                    type="file"
                    style={{ display: "none" }}
                    ref={pictureRef}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <button onClick={changeProfilePicture}>
                    Change profile picture
                </button>
            </div>
        </div>
    );
};

export default ProfilePic;
