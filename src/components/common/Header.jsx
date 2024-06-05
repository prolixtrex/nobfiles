import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../dataContext/DataContext";
import { Link } from "react-router-dom";
import "./header.css";

const Options = () => {
    const {
        tagNames,
        activePage,
        initialImages,
        setPhotos,
        photos,
        videos,
        documents,
        activeTag,
        setActiveTag,
    } = useContext(DataContext);
    const [filter, setFilter] = useState("All Files");

    const numOfFiles =
        activePage === "images"
            ? photos.length
            : activePage === "videos"
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
            {activePage === "profilePage" ? (
                <>
                    <div>
                        <h3>Profile</h3>
                    </div>
                    <div>
                        <button>Delete Account</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="title">
                        <h4>
                            {activePage !== "home"
                                ? `(${numOfFiles} ${activePage})`
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
                                    defaultValue={tag}
                                    selected={activeTag === tag ? true : false}
                                >
                                    {tag}
                                </option>
                            ))}
                        </select>
                        <Link to={`/upload`}>
                            <button>
                                Add{" "}
                                {activePage !== "home" ? activePage : "Files"}
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Options;
