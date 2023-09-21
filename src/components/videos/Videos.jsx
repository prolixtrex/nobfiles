import { useEffect, useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import Header from "../common/Header";
import "./videos.css";

const Videos = () => {
    const { setActiveCat } = useContext(DataContext);

    useEffect(() => {
        setActiveCat("videos");
    });

    return (
        <div className="main videos">
            <Header />
            Videos
        </div>
    );
};

export default Videos;
