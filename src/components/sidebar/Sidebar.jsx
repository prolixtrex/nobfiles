import React from "react";
import Profile from "./Profile";
import Search from "../common/Search";
import Categories from "../common/Categories";
import Tags from "../common/Tags";
import LogOutBtn from "../common/account/LogoutBtn";
import "./sidebar.css";

const Sidebar = () => {
    return (
        <aside className="aside">
            <Profile />
            <Search />
            <Categories />
            <Tags />
            <LogOutBtn />
        </aside>
    );
};

export default Sidebar;
