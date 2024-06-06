import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../dataContext/DataContext";
import "./search.css";

const Search = () => {
    const { initialImages, setPhotos } = useContext(DataContext);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const result = initialImages.filter((data) =>
            data.title.toLowerCase().includes(search.toLowerCase())
        );
        setPhotos(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <div className="search">
            <input
                type="text"
                value={search}
                placeholder="search files"
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default Search;
