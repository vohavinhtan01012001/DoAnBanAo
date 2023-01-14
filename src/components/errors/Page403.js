import React, { useEffect } from "react";

function Page403() {
    useEffect(() => {
        document.title = "403";
    },[])
    return (
        <div className="page403">
            <h1 className="text"><span>403</span></h1>
        </div>
    );
}

export default Page403;