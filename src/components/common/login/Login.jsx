import { useContext } from "react";
import { DataContext } from "../../../dataContext/DataContext";
import { getAuth, signOut } from "firebase/auth";
import { BiLogIn } from "react-icons/bi";
import "./login.css";

const Login = () => {
    const { loggedIn, setLoggedIn, setUser, setIsModalOpen } =
        useContext(DataContext);
    // const [error, setError] = useState(null)

    const handleClick = (action) => {
        action === "login" && setIsModalOpen(true);
        if (action === "logout") {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    setUser(null);
                    setLoggedIn(false);
                })
                .catch((error) => {
                    // An error happened.
                    alert(
                        `Error ${error.message} has occured, Try signing out again`
                    );
                });
        }
    };

    return (
        <div className="login">
            <button
                onClick={() => handleClick(loggedIn ? "logout" : "login")}
                id="login"
            >
                <BiLogIn className="icon" />
                <p>{loggedIn ? "Logout" : "Login"}</p>
            </button>
        </div>
    );
};

export default Login;
