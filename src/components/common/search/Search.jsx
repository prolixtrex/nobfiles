import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../dataContext/DataContext";
import "./search.css";

const Search = () => {
    const { images, setImages } = useContext(DataContext);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const result = images.filter((image) =>
            image.title.toLowerCase().includes(search.toLowerCase())
        );
        setImages(result);
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
