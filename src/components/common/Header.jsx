import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../dataContext/DataContext";
import { Link } from "react-router-dom";
import "./header.css";

const Options = () => {
    const {
        tagNames,
        activeCat,
        initialImages,
        setPhotos,
        photos,
        videos,
        documents,
        loggedIn,
        activeTag,
        setActiveTag,
    } = useContext(DataContext);
    const [filter, setFilter] = useState("All Files");

    const numOfFiles =
        activeCat === "images"
            ? photos.length
            : activeCat === "videos"
            ? videos.length
            : documents.length;

    useEffect(() => {
        setActiveTag(filter);
        if (filter !== "All Files") {
            const filtered = initialImages.filter((photo) =>
                photo.tag.includes(filter)
            );
            setPhotos(filtered);
        } else {
            setPhotos(initialImages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    return (
        <div className="header">
            <div className="title">
                <h4>
                    {activeCat !== "home"
                        ? `(${numOfFiles} ${activeCat})`
                        : "All FIles"}
                </h4>
            </div>
            <div>
                <select
                    name="filter"
                    id="filter"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    {tagNames.map((tag) => (
                        <option
                            key={tag}
                            value={tag}
                            selected={activeTag === tag ? true : false}
                        >
                            {tag}
                        </option>
                    ))}
                </select>
                <Link to={`/upload`}>
                    <button>
                        Add {activeCat !== "home" ? activeCat : "Files"}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Options;
