import { useState } from "react";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firebaseError, setFirebaseError] = useState(null);
    const [passwordMissmatch, setPasswordMissmatch] = useState(null);
    const [message, setMessage] = useState("");

    const auth = getAuth();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get("oobCode");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordMissmatch("Passwords do not match");
            return;
        }

        confirmPasswordReset(auth, oobCode, newPassword)
            .then(() => {
                setMessage("Your password has been changed successfully");
                navigate("/");
            })
            .catch((error) => {
                setFirebaseError("Error resetting password", error);
            });
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
                            value="Reset password"
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
