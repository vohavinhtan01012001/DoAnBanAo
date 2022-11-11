import { faBackward, faBackwardFast, faBagShopping, faBox, faCartShopping, faHouse, faHouseChimneyWindow, faSliders, faTimes, faUserCircle, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar({onCloseClick}) {

    return (
        <nav className="Sidebar__admin">
            <ul className="Sidebar__admin--menu">
                <li className="admin__menu--account">
                    <div className="admin__menu--close-icon" onClick={onCloseClick}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </li>
                <li className="admin__menu--account-first">
                    <Link className="admin__menu--account-link-first">
                        <div className="admin__menu--account-icon">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        <p>Admin</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <Link to="/admin/dashboard" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faHouse} className="account__link--icon" />
                        <p>Thống kê</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <Link to="" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faBagShopping} className="account__link--icon" />
                        <p>Quản lý sản phẩm</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <Link to="/admin/add-category" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faSliders} className="account__link--icon" />
                        <p>Quản lý phân loại </p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <Link to="" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faBox} className="account__link--icon" />
                        <p>Quản lý đơn hàng</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <Link to="" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faCartShopping} className="account__link--icon" />
                        <p>Quản lý giỏ hàng</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <Link to="/admin/account" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faUsersGear} className="account__link--icon" />
                        <p>Quản lý tài khoản</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;