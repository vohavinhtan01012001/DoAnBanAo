import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";
import Im from "../../assets/frontend/img/detail/lss.png";

function Search() {
    const [product, setProduct] = useState([]);

    const [message, setMessage] = useState('')

    const callbackFunction = (childData) => {
        setMessage(childData)
    }
    const slug = message;
    useEffect(() => {
        if (slug != "") {
            axios.get(`/api/search/${slug}`).then(res => {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                }
                else if (res.data.status === 404) {

                }
            });
        }
    }, [message])


    var showProductsList = "";
    /*  if (loading) {
         return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
     }
     else { */

    if (product.length > 0) {
        showProductsList = product.map((item, index) => {
            if (item.quantityM == 0 && item.quantityL == 0 && item.quantityXL == 0) {
                return (<div key={index} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                    <div className="content__product">
                        <div className="content__product-item">
                            <img src={`http://localhost:8000/${item.image}`}
                                className="content__product-img">
                            </img>
                            <img src={Im}
                                className="content__product-img2">
                            </img>
                            <p className="content__product-text">
                                {item.name}
                            </p>
                        </div>
                        <div className="content-product-item2">
                            <div className="content__product-text2">
                                VERGENCY
                            </div>
                            <div className="content__product-evaluate">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className="content__product-price">
                                <div className="content__product-price--item1 error">
                                    Hết hàng
                                </div>
                            </div>
                            <div className="content__product-new">new</div>
                            {item.promotion ? <div className="content__product-sale">{"-"+item.promotion.discount+"%"}</div>:""}
                        </div>
                    </div>
                </div>)
            }
            else {
                return (<div key={index} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                    <div className="content__product">

                        <Link to={`/${item.categorys.name}/${item.id}`} className="content__product-item">
                            <img src={`http://localhost:8000/${item.image}`}
                                className="content__product-img">
                            </img>
                            <p className="content__product-text">
                                {item.name}
                            </p>
                        </Link>
                        <div className="content-product-item2">
                            <div className="content__product-text2">
                                VERGENCY
                            </div>
                            <div className="content__product-evaluate">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className="content__product-price">
                            {item.promotion ? 
                                    <div className="content__product-price--item1">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.price * (100 - item.promotion.discount))/100)}</div> : 
                                    <div className="content__product-price--item1">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</div> }
                                    {item.promotion ? <del className="content__product-price--item2">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</del>:""}
                            </div>
                            <div className="content__product-new">new</div>
                            {item.promotion ? <div className="content__product-sale">{"-"+item.promotion.discount+"%"}</div>:""}
                        </div>
                    </div>
                </div>)
            }
        })
    }

    return (
        <React.Fragment>
            <Header parentCallback={callbackFunction} />
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="/" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <div className="app__container--link">Tìm kiếm</div>
                        </div>
                    </div>
                </div>
                <div className="grid wide">
                    <div className="row">
                        <div className="col">
                            <div className="tshirts__title">
                                <h3 className="tshirts__title--heading">Tìm kiếm: {slug != "" ? slug : ""}</h3>
                            </div>
                            <div className="tshirts__content">
                                <div className="row">
                                    {showProductsList}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Search;