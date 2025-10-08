import { useEffect } from "react";
import GalleryModule from "../components/GalleryModule";

function Gallery() {
    useEffect(() => {
        document.title = "Art Institute of Chicago Gallery Website - Gallery";
    }, []);
    return (
        <div className="gallery">
            <GalleryModule />
        </div>
    );
}
export default Gallery;