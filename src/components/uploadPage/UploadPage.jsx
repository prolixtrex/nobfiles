import { useState } from "react";
import { Link } from "react-router-dom";
import "./uploadPage.css";

const UploadPage = () => {
    const [fileName, setFileName] = useState("");
    const [fileType, setFileType] = useState(null);
    const [addTags, setAddTags] = useState([]);
    const [files, setFiles] = useState([]);

    // const handleChange = () => {
    //     if (e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     }
    // };

    // const handleUpload = () => {
    //     const upload =
    // }

    return (
        <main className="main">
            <div>
                <Link to={`/`}>Back</Link>
            </div>
            <div className="uploadPage">
                <div className="header">
                    <h4>Upload files from your local storage</h4>
                </div>
                <div className="preview">preview file</div>
                <div className="browse">
                    <input type="file" />
                    <button>Upload</button>
                </div>
                <div className="infos">
                    <div>
                        File name: <input type="text" />
                    </div>
                    <div>
                        File type:
                        <select
                            name="fileType"
                            id="fileType"
                            defaultValue="image"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="document">Document</option>
                        </select>
                    </div>
                    <div className="tag">
                        Tag: <input type="text" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UploadPage;
