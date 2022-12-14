import { faAngleDown, faAngleRight, faBagShopping, faBox, faCartShopping, faHouse, faSliders, faTimes, faUserCircle, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ onCloseClick }) {
    const [menuAdminProduct, setMenuAdminProduct] = useState(false);
    const [menuAdminCategory, setMenuAdminCategory] = useState(false);
    const [menuAdminAccount, setMenuAdminAccount] = useState(false);

    //Xử lý hiện menu sản phẩm
    const handleMenuProduct = () => {
        if (!menuAdminProduct) {
            setMenuAdminProduct(true);
        }
        else {
            setMenuAdminProduct(false);
        }
    };

    var listMenuProduct = "";
    var iconMenuProduct = "";
    if (menuAdminProduct) {
        iconMenuProduct = (<FontAwesomeIcon icon={faAngleDown} className="menu__admin--icon" />)
        listMenuProduct = (<ul className='header__menu-list2'>
            <li className='haeder__menu-item2'>
                <Link to="/admin/add-product" className='header__menu-link2'>Thêm sản phẩm</Link>
            </li>
            <li className='haeder__menu-item2'>
                <Link to="/admin/view-product" className='header__menu-link2'>Danh sách sản phẩm</Link>
            </li>
        </ul>)
    }
    else {
        iconMenuProduct = (<FontAwesomeIcon icon={faAngleRight} className="menu__admin--icon" />)
        listMenuProduct = "";
    }

    //Xử lý hiện menu phân loại

    const handleMenuCategory = () => {
        if (!menuAdminCategory) {
            setMenuAdminCategory(true);
        }
        else {
            setMenuAdminCategory(false);
        }
    };

    var listMenuCategory = "";
    var iconMenuCategory = "";
    if (menuAdminCategory) {
        iconMenuCategory = (<FontAwesomeIcon icon={faAngleDown} className="menu__admin--icon" />)
        listMenuCategory = (<ul className='header__menu-list2'>
            <li className='haeder__menu-item2'>
                <Link to="/admin/add-Category" className='header__menu-link2'>Thêm loại sản phẩm</Link>
            </li>
            <li className='haeder__menu-item2'>
                <Link to="/admin/view-Category" className='header__menu-link2'>Danh sách loại sản phẩm</Link>
            </li>
        </ul>)
    }
    else {
        iconMenuCategory = (<FontAwesomeIcon icon={faAngleRight} className="menu__admin--icon" />)
        listMenuCategory = "";
    }

    //Xử lý account
    const handleMenuAccount = () => {
        if (!menuAdminAccount) {
            setMenuAdminAccount(true);
        }
        else {
            setMenuAdminAccount(false);
        }
    };

    var listMenuAccount = "";
    var iconMenuAccount = "";
    if (menuAdminAccount) {
        iconMenuAccount = (<FontAwesomeIcon icon={faAngleDown} className="menu__admin--icon" />)
        listMenuAccount = (<ul className='header__menu-list2'>
            <li className='haeder__menu-item2'>
                <Link to="/admin/add-Account" className='header__menu-link2'>Tạo tài khoản</Link>
            </li>
            <li className='haeder__menu-item2'>
                <Link to="/admin/view-Account" className='header__menu-link2'>Danh sách tài khoản</Link>
            </li>
        </ul>)
    }
    else {
        iconMenuAccount = (<FontAwesomeIcon icon={faAngleRight} className="menu__admin--icon" />)
        listMenuAccount = "";
    }

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
                    <div onClick={handleMenuProduct} className="admin__menu--account-listMenu">
                        <div className="admin__menu--account-link">
                            <div className="admin__menu--account-text">
                                <FontAwesomeIcon icon={faBagShopping} className="account__link--icon" />
                                <p>Quản lý sản phẩm</p>
                            </div>
                            {iconMenuProduct}
                        </div>
                        {listMenuProduct}
                    </div>
                </li>
                <li className="admin__menu--account">
                    <div onClick={handleMenuCategory} className="admin__menu--account-listMenu">
                        <div className="admin__menu--account-link">
                            <div className="admin__menu--account-text">
                                <FontAwesomeIcon icon={faSliders} className="account__link--icon" />
                                <p>Quản lý loại sản phẩm</p>
                            </div>
                            {iconMenuCategory}
                        </div>
                        {listMenuCategory}
                    </div>
                </li>
                <li className="admin__menu--account">
                    <Link to="" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faBox} className="account__link--icon" />
                        <p>Quản lý đơn hàng</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <div onClick={handleMenuAccount} className="admin__menu--account-listMenu">
                        <div className="admin__menu--account-link">
                            <div className="admin__menu--account-text">
                                <FontAwesomeIcon icon={faUsersGear} className="account__link--icon" />
                                <p>Quản lý Tài khoản</p>
                            </div>
                            {iconMenuAccount}
                        </div>
                        {listMenuAccount}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;