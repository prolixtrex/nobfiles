import { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [firebaseError, setFirebaseError] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMissmatch, setPasswordMissmatch] = useState(null);

    const auth = getAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword === confirmPassword) {
            updatePassword(auth.currentUser, newPassword).then(() => {
                // alert("Your password has been changed successfully");
                // signOut(auth)
                //     .then(() => {
                //         setUser(null);
                //         setLoggedIn(false);
                //         navigate("/");
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //     });
            });
        } else {
            setPasswordMissmatch("Your passwords do not match");
            return false;
        }
    };

    return (
        <div className="account">
            <form onSubmit={handleSubmit} className="accountWrapper">
                <div className="accountHeader">
                    <h4>
                        <em>Set a new password</em>
                    </h4>
                </div>
                <div className="accountBody">
                    <div className="erroraccount">
                        {passwordMissmatch && <p>{passwordMissmatch}</p>}
                        {firebaseError && <p>{firebaseError}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setFirebaseError(null);
                                setPasswordMissmatch(null);
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Confirm Password:</label>
                        <input
                            type="password"
                            id="confrimPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setFirebaseError(null);
                                setPasswordMissmatch(null);
                            }}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Change password"
                            id="submit"
                        />
                    </div>
                    <div>
                        <i>
                            go back to <Link to="/">login</Link>
                        </i>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
