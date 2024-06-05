import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../dataContext/DataContext";
import { getAuth, signOut } from "firebase/auth";
import { BiLogIn } from "react-icons/bi";
import "./logoutBtn.css";

const Logout = () => {
    const { setLoggedIn, setUser } = useContext(DataContext);
    // const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleClick = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setUser(null);
                setLoggedIn(false);
                navigate("./");
            })
            .catch((error) => {
                // An error happened.
                alert(
                    `Error ${error.message} has occured, Try signing out again`
                );
            });
    };

    return (
        <div className="logout">
            <button onClick={handleClick} id="logout">
                <BiLogIn className="icon" />
                <p>Logout</p>
            </button>
        </div>
    );
};

export default Logout;
