import { useEffect, useContext } from "react";
import { DataContext } from "../../dataContext/DataContext";
import { PiCaretDoubleRight } from "react-icons/pi";
import Header from "../common/header/Header";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
    const { setActivePage, images, videos, documents } =
        useContext(DataContext);

    useEffect(() => {
        setActivePage("home");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="main home">
            <Header />
            <div className="sections">
                <div className="section-title">
                    <h2>Images</h2>
                    <Link to={"/images"}>
                        <i>
                            See All <PiCaretDoubleRight />
                        </i>
                    </Link>
                </div>
                <div className="section-image">
                    {images.map((image, index) => (
                        <Link
                            key={index}
                            to={`/${image.title}`}
                            className="img"
                        >
                            <img src={image.url} alt={image.title} />
                            <div className="info">
                                <p>{image.title}</p>
                                <p>{image.tag}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="sections">
                <div className="section-title">
                    <h2>Videos</h2>
                    <Link to={"/videos"}>
                        <i>
                            See All <PiCaretDoubleRight />
                        </i>
                    </Link>
                </div>
                <div></div>
            </div>
            <div className="sections">
                <div className="section-title">
                    <h2>Documents</h2>
                    <Link to={"/documents"}>
                        <i>
                            See All <PiCaretDoubleRight />
                        </i>
                    </Link>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Home;
