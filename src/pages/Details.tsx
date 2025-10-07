import { useEffect } from "react";
import DetailsModule from "../components/DetailsModule";

function Details() {
    useEffect(() => {
        document.title = "Art Institute of Chicago Gallery Website - Details";
    }, []);
    return (
        <div className="details">
            <DetailsModule />
        </div>
    );
}
export default Details;