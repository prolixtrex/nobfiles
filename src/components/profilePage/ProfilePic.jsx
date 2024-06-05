import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

function ProfilePic({
    profilePicURL,
    pictureRef,
    handleFileChange,
    changeProfilePicture,
}) {
    return (
        <div className="profilePic">
            <div className="imageWrapper">
                {profilePicURL ? (
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
}

export default ProfilePic;
