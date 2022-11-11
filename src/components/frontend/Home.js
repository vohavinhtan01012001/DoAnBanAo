import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/frontend/css/grid.css";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";
function Home() {
    return (
        <React.Fragment>
            <Header />
            <Footer />
        </React.Fragment>
    );
}

export default Home;

