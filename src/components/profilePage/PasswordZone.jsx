import React from "react";

const PasswordZone = ({
    editPassword,
    passwordMissmatch,
    newPassword,
    editingPassword,
    confirmPassword,
    cancelEdit,
    savePassword,
    setEditPassword,
    setPasswordMissmatch,
}) => {
    return (
        <div className="controls">
            {editPassword ? (
                <div>
                    {passwordMissmatch && <div>{passwordMissmatch}</div>}
                    <div className="passwords">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => editingPassword(e, "newPassword")}
                        />
                    </div>
                    <div className="passwords">
                        <label htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) =>
                                editingPassword(e, "confirmPassword")
                            }
                        />
                    </div>
                    <div>
                        <button onClick={() => cancelEdit("password")}>
                            Cancel
                        </button>
                        <button onClick={savePassword}>
                            Save New Password
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => {
                        setEditPassword(true);
                        setPasswordMissmatch("");
                    }}
                >
                    Change password
                </button>
            )}
        </div>
    );
};

export default PasswordZone;
