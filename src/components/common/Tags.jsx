import { useContext, useState } from "react";
import { DataContext } from "../../dataContext/DataContext";
import "./tags.css";

const Tags = () => {
    const {
        tagNames,
        handleTags,
        handleRenameTag,
        initialImages,
        setPhotos,
        activeTag,
        setActiveTag,
    } = useContext(DataContext);
    const [tagEdit, setTagEdit] = useState("");
    const [addTag, setAddTag] = useState(false);
    const [isRenameTag, setIsRenameTag] = useState("");

    const handleSaveTag = (caller, event, oldName = "") => {
        if (caller === "addTag" && event.key === "Enter") {
            handleTags("add", tagEdit);
            setAddTag(false);
            setTagEdit("");
        }

        if (caller === "renameTag" && event.key === "Enter") {
            handleRenameTag(oldName, tagEdit);
            setIsRenameTag("");
            setTagEdit("");
        }
    };

    const handleClick = (tag) => {
        setActiveTag(tag);
        if (tag !== "All Files") {
            const filtered = initialImages.filter((photo) =>
                photo.tag.includes(tag)
            );
            setPhotos(filtered);
        } else {
            setPhotos(initialImages);
        }
    };

    return (
        <div className="tags">
            {!addTag ? (
                <div className="tag">
                    <h2>ALBUMS</h2>
                    <button type="button" onClick={() => setAddTag(true)}>
                        +
                    </button>
                </div>
            ) : (
                <div className="tag">
                    <input
                        type="text"
                        value={tagEdit}
                        onChange={(e) => setTagEdit(e.target.value)}
                        onKeyDown={(e) => handleSaveTag("addTag", e)}
                        autoFocus
                        required
                    />
                    <button onClick={() => setAddTag(false)}>X</button>
                </div>
            )}
            <ul>
                {tagNames.sort().map((tagName) => (
                    <li
                        key={tagName}
                        className={tagName === activeTag ? "active" : ""}
                    >
                        {isRenameTag === tagName ? (
                            <div id="renameTag">
                                <input
                                    type="text"
                                    value={tagEdit}
                                    onChange={(e) => setTagEdit(e.target.value)}
                                    onKeyDown={(e) =>
                                        handleSaveTag("renameTag", e, tagName)
                                    }
                                    required
                                    autoFocus
                                />
                                <button
                                    id="cancelRename"
                                    onClick={() => setIsRenameTag("")}
                                >
                                    X
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    id="tagname"
                                    onClick={() => handleClick(tagName)}
                                >
                                    <p className="firstLetter">
                                        {tagName.charAt(0) + tagName.charAt(1)}
                                    </p>
                                    <p className="name">{tagName}</p>
                                </button>
                                {tagName !== "All Files" && (
                                    <div className="delete">
                                        <button
                                            onClick={() =>
                                                setIsRenameTag(tagName)
                                            }
                                        >
                                            R
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleTags("delete", tagName)
                                            }
                                        >
                                            D
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tags;
