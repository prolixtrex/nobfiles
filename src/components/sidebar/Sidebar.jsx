import React from "react";
import Profile from "./Profile";
import Search from "../common/Search";
import Categories from "../common/Categories";
import Tags from "../common/Tags";
import Login from "../common/login/Login";
import "./sidebar.css";

const Sidebar = () => {
    return (
        <aside className="aside">
            <Profile />
            <Search />
            <Categories />
            <Tags />
            <Login />
        </aside>
    );
};

export default Sidebar;
