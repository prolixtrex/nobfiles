import React from "react";
import Profile from "./Profile";
import Search from "../common/search/Search";
import Categories from "../common/categories/Categories";
import Tags from "../common/tags/Tags";
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
