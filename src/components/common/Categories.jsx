import { useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import { BsImage } from "react-icons/bs";
import { GoVideo } from "react-icons/go";
import { AiOutlineFileWord, AiOutlineHome } from "react-icons/ai";
import "./categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
    const { activeCat, setActiveCat } = useContext(DataContext);

    return (
        <div className="categories">
            <h2>CATEGORIES</h2>
            <ul>
                <li className={activeCat === "home" ? "active" : ""}>
                    <Link to={"/"}>
                        <button>
                            <AiOutlineHome className="icon" />
                            <p>Home</p>
                        </button>
                    </Link>
                </li>
                <li className={activeCat === "images" ? "active" : ""}>
                    <Link to={"/images"}>
                        <button>
                            <BsImage className="icon" />
                            <p>Photos</p>
                        </button>
                    </Link>
                </li>
                <li className={activeCat === "videos" ? "active" : ""}>
                    <Link to={"/videos"}>
                        <button>
                            <GoVideo className="icon" />
                            <p>Videos</p>
                        </button>
                    </Link>
                </li>
                <li className={activeCat === "documents" ? "active" : ""}>
                    <Link to={"/documents"}>
                        <button>
                            <AiOutlineFileWord className="icon" />
                            <p>Documents</p>
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Categories;
