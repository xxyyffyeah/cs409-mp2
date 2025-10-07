import React, {useEffect} from "react";
import SeachModule from "../components/SearchModule";


function List() {
    useEffect(() => {
        document.title = "Art Institute of Chicago Gallery Website - Search";
    }, []);
    return (
        <div className="list">
            <SeachModule />
        </div>
    );
}
export default List;