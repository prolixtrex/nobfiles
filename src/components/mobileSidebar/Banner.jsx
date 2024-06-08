import { useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import { Link } from "react-router-dom";
import noban from "../../assets/logo/noban.png";

const Banner = ({ expand, setExpand }) => {
    const { userDisplayName } = useContext(DataContext);

    return (
        <div className="profile">
            {expand && (
                <div>
                    <Link to="/profilePage">{userDisplayName}</Link>
                </div>
            )}
            <button className="logo" onClick={() => setExpand(!expand)}>
                <img src={noban} alt="logo" />
            </button>
        </div>
    );
};

export default Banner;
