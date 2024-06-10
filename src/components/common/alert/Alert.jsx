import React from "react";

const Alert = ({ message }) => {
    return (
        <div>
            <div className="message">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Alert;
