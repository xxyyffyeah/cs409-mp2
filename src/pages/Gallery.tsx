import {useEffect} from "react";
import SeachModule from "../components/SearchModule";


function Gallery() {
    useEffect(() => {
        document.title = "Art Institute of Chicago Gallery Website - Gallery";
    }, []);
    return (
        <div className="list">
            <SeachModule />
        </div>
    );
}
export default Gallery;