import { useState } from "react";
import Banner from "./Banner";
import Tags from "../common/tags/Tags";
import LogOutBtn from "../common/account/LogoutBtn";
import Categories from "../common/categories/Categories";
import "./mobileSidebar.css";

const MobileSidebar = () => {
    const [expand, setExpand] = useState(false);

    return (
        <aside className={`mobileSidebar ${expand ? "open" : "close"}`}>
            <Banner {...{ expand, setExpand }} />
            <Categories />
            <Tags />
            <LogOutBtn />
        </aside>
    );
};

export default MobileSidebar;
