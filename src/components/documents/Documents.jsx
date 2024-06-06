import { useEffect, useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import Header from "../common/header/Header";
import "./documents.css";

const Documents = () => {
    const { setActivePage } = useContext(DataContext);

    useEffect(() => {
        setActivePage("documents");
    });

    return (
        <div className="main documents">
            <Header />
            Documents
        </div>
    );
};

export default Documents;
