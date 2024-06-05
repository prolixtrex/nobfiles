import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestoreDb } from "../../../firebase/firebase";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth();

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            const usersRef = collection(firestoreDb, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setErrorMessage(
                    "Email not found. Please enter a registered email."
                );
            } else {
                await sendPasswordResetEmail(auth, email)
                    .then(() => {
                        alert("Check your email for a password reset link");
                    })
                    .catch((error) => {
                        console.log("error resetting password", error);
                    });
            }
        } catch (error) {
            console.log(error);
            // setErrorMessage("error sending password reset", error);
        }
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
