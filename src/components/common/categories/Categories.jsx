import { useContext } from "react";
import { DataContext } from "../../../dataContext/DataContext";
import { BsImage } from "react-icons/bs";
import { GoVideo } from "react-icons/go";
import { AiOutlineFileWord, AiOutlineHome } from "react-icons/ai";
import "./categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
    const { activePage, photos, videos, documents } = useContext(DataContext);

    return (
        <div className="categories">
            <h2>CATEGORIES</h2>
            <ul>
                <li className={activePage === "home" ? "active" : ""}>
                    <Link to={"/"}>
                        <button>
                            <AiOutlineHome className="icon" />
                            <p>Home</p>
                        </button>
                    </Link>
                </li>
                <li className={activePage === "images" ? "active" : ""}>
                    <Link to={"/images"}>
                        <button>
                            <div>
                                <BsImage className="icon" />
                                <p>Photos</p>
                            </div>
                            <p style={{ justifySelf: "flex-end" }}>
                                {photos?.length}
                            </p>
                        </button>
                    </Link>
                </li>
                <li className={activePage === "videos" ? "active" : ""}>
                    <Link to={"/videos"}>
                        <button>
                            <div>
                                <GoVideo className="icon" />
                                <p>Videos</p>
                            </div>
                            <p>{videos?.length}</p>
                        </button>
                    </Link>
                </li>
                <li className={activePage === "documents" ? "active" : ""}>
                    <Link to={"/documents"}>
                        <button>
                            <div>
                                <AiOutlineFileWord className="icon" />
                                <p>Documents</p>
                            </div>
                            <p>{documents?.length}</p>
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Categories;
