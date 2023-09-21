import { useEffect, useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import Header from "../common/Header";
import "./documents.css";

const Documents = () => {
    const { setActiveCat } = useContext(DataContext);

    useEffect(() => {
        setActiveCat("documents");
    });

    return (
        <div className="main documents">
            <Header />
            Documents
        </div>
    );
};

export default Documents;
