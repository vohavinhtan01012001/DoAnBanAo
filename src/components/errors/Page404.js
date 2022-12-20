import React, { useEffect } from "react";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";
import page404 from "../../assets/frontend/img/error/404.png";
function Page404() {
    useEffect(() => {
        document.title = "404";
    },[])
    return (
        <React.Fragment>
            <Header />
            <div className="container__page404">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12 m-12 c-12">
                            <img src={page404} className="page404" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Page404;