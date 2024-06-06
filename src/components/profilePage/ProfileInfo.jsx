import React from "react";

function ProfileInfo({
    editInfo,
    userFirstName,
    userLastName,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userEmail,
    cancelEdit,
    saveEditInfo,
    setEditInfo,
    displayName,
    setDisplayName,
}) {
    return (
        <div className="profileInfo">
            <div className="names">
                {!editInfo ? (
                    <div>
                        <h3 style={{ display: "inline-block" }}>
                            {userFirstName}
                        </h3>
                        {` `}
                        <h3 style={{ display: "inline-block" }}>
                            {userLastName}
                        </h3>
                    </div>
                ) : (
                    <div className="editInfo">
                        <div>
                            First Name:{" "}
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            Last Name:{" "}
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            Display Name:{" "}
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="email">
                <div>
                    <h2>{userEmail}</h2>
                </div>
            </div>
            <div>
                {editInfo ? (
                    <>
                        <button onClick={() => cancelEdit("info")}>
                            Cancel
                        </button>
                        <button onClick={saveEditInfo}>Save Changes</button>
                    </>
                ) : (
                    <button onClick={() => setEditInfo(true)}>
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProfileInfo;
