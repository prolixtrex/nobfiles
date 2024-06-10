import React from "react";
import loading from "../../../assets/loading/loading.gif";
import "./loading.css";

const LoadingIndicator = () => {
    return (
        <div className="loading">
            <img src={loading} alt="" />
        </div>
    );
};

export default LoadingIndicator;
