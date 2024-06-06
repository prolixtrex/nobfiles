import { useEffect, useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import Header from "../common/header/Header";
import "./videos.css";

const Videos = () => {
    const { setActivePage } = useContext(DataContext);

    useEffect(() => {
        setActivePage("videos");
    });

    return (
        <div className="main videos">
            <Header />
            Videos
        </div>
    );
};

export default Videos;
