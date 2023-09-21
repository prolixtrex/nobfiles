import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../../dataContext/DataContext";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import "./modal.css";

const LoginModal = () => {
    const { isModalOpen, setLoggedIn, user, setUser, setIsModalOpen } =
        useContext(DataContext);
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(user);
    }, [user]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                setIsModalOpen(false);
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
            setError(error.message);
        }
    };

    //     const auth = getAuth();
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });

    return (
        <div className={`${isModalOpen ? "modal" : "modal close"}`}>
            <div className="modalWrapper">
                <div className="modalHeader">
                    <h4>
                        <em>Welcome to Nob Files, login to continue</em>
                    </h4>
                </div>
                <div className="modalBody">
                    <form onSubmit={handleSignIn}>
                        {error && <p>{error}</p>}
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input type="submit" value="Login" id="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
