import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../../assets/admin/css/styles.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"
import Footer from "./Footer"

function MasterLayout(){
    const [onMenu, setOnMenu] = useState(false);
    
    //Xử lý Sidebar Menu
    const hanleMenu = ()=> {
        if(!onMenu){
            setOnMenu(true);
        }
        else{
            setOnMenu(false);
        }
    };
    const hanldClose = () => {
        if (onMenu) {
            setOnMenu(false);
        }
    }

    var sidebar = document.querySelector('.Sidebar__admin--menu');
    var container = document.querySelector('.container__admin--main');
    var navbar = document.querySelector('.navbar__admin');
    var menuAdminTabletMobile ="";
    if(onMenu){
        menuAdminTabletMobile = <Sidebar onCloseClick={hanldClose}/>;
        /* navbar.style.width = '100%';
        navbar.style.left = '30%' ? '30%' : '0';
        container.style.left = '30%'; */
        /* sidebar.style.right = '77%'; */
    }
    else{
        menuAdminTabletMobile = "";
    }

    

    return (
        <div className="container__admin">
            {menuAdminTabletMobile}
            <div id="layoutSidenav_content">
                <main>
                    <Navbar onNavbarClick={hanleMenu} />
                    <div className="container__admin--main"><Outlet /></div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default MasterLayout;