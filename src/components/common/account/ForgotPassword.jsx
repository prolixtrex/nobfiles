import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth();

    const handleReset = async (e) => {
        e.preventDefault();

        await sendPasswordResetEmail(auth, email)
            .then(() => {
                alert(
                    "If your email is registered, you will receive a password reset link"
                );
            })
            .catch((error) => {
                console.log("error resetting password", error);
            });
    };

    return (
        <div className="account">
            <div className="accountWrapper">
                <div className="accountHeader">
                    <h4>
                        <em>Enter your email to reset your password</em>
                    </h4>
                </div>
                <div className="accountBody">
                    <form onSubmit={handleReset}>
                        <div>{errorMessage}</div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrorMessage("");
                                }}
                            />
                        </div>
                        <div>
                            <input
                                type="submit"
                                value="Send password reset link"
                            />
                        </div>
                        <div>
                            <i>
                                Back to <Link to="/">login</Link>
                            </i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
