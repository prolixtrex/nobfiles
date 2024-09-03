import { useContext } from "react";
import { DataContext } from "../../../dataContext/DataContext";
import "./alert.css";

const Alert = ({ action, setResp }) => {
    const { alertMessage, setAlertMessage } = useContext(DataContext);

    const cancel = () => {
        setAlertMessage("");
        setResp("");
    };

    return (
        <div className="alert">
            <div className="alert-body">
                <div className="message">
                    <p>{alertMessage}</p>
                </div>
                <div className="actionBtn">
                    {action !== "" && (
                        <button onClick={() => setResp(action)}>Confirm</button>
                    )}
                    <button onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
