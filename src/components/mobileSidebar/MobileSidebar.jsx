import { useState } from "react";
import noban from "../../assets/logo/noban.png";
import "./mobileSidebar.css";
import Tags from "../common/Tags";
import LogOutBtn from "../common/account/LogoutBtn";
import Categories from "../common/Categories";

const MobileSidebar = () => {
    const [expand, setExpand] = useState(false);

    return (
        <aside className={`mobileSidebar ${expand ? "open" : "close"}`}>
            <button className="profile" onClick={() => setExpand(!expand)}>
                <img src={noban} alt="logo" />
            </button>
            <Categories />
            <Tags />
            <LogOutBtn />
        </aside>
    );
};

export default MobileSidebar;
