import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../dataContext/DataContext";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import "./account.css";

const Login = () => {
    const { setLoggedIn, setUser } = useContext(DataContext);
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firebaseError, setFirebaseError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                setLoggedIn(true);
                setEmail("");
                setPassword("");
            } else {
                // User is signed out
                setUser(null);
                setLoggedIn(false);
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setFirebaseError(error.message);
        }
    };

    return (
        <div className="account">
            <div className="accountWrapper">
                <div className="accountHeader">
                    <h4>
                        <em>Welcome to Nob Files, login to continue</em>
                    </h4>
                </div>
                <div className="accountBody">
                    <form onSubmit={handleSignIn}>
                        <div className="erroraccount">
                            {firebaseError && <p>{firebaseError}</p>}
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setFirebaseError(null);
                                }}
                                autoFocus
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setFirebaseError(null);
                                }}
                                required
                            />
                        </div>
                        <div>
                            <input type="submit" value="login" id="submit" />
                        </div>
                    </form>
                </div>
                <div className="accountFooter">
                    <i>
                        <Link to="/forgotPassword">forgot password?</Link> or
                        <Link to="/signup"> signup</Link> to create your account
                    </i>
                </div>
            </div>
        </div>
    );
};

export default Login;
