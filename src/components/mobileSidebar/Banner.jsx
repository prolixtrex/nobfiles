import { useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import { Link } from "react-router-dom";
import noban from "../../assets/logo/noban.png";

const Banner = ({ expand, setExpand }) => {
    const { displayName } = useContext(DataContext);

    return (
        <div className="profile">
            {expand && <Link to="/profilePage">{displayName}</Link>}
            <button className="logo" onClick={() => setExpand(!expand)}>
                <img src={noban} alt="logo" />
            </button>
        </div>
    );
};

export default Banner;
