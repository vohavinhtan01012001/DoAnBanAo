import { faChevronRight, faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../layouts/frontend/Footer";
import Header from "../../../layouts/frontend/Header";
import MenuCategory from "../../../layouts/frontend/MenuCategory";

function Jacker() {
    const [viewProduct, setViewProduct] = useState([]);


    //xử lý hiện sản phẩm
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/view-product`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setViewProduct(res.data.products);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);



    return (
        <React.Fragment>
            <Header />
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="./index.html" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <Link to="./index.html" className="app__container--link">Danh mục</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <p className="app__container--text">JACKER</p>
                        </div>
                    </div>
                </div>
                <div className="grid wide">
                    <div className="row">
                        <MenuCategory />
                        <div className="col l-9">
                            <div className="tshirts__title">
                                <h3 className="tshirts__title--heading">JACKER</h3>
                                <div className="tshirts__title--sort">
                                    <p className="tshirts__title--text">Sắp xếp theo:</p>
                                    <div className="tshirts__title--option">
                                        <select id="search" className="tshirts__title--select">
                                            <option >Mới nhất</option>
                                            <option >Sản phẩm nổi bật</option>
                                            <option >Giá:Tăng dần</option>
                                            <option >Giá:Giảm dần</option>
                                            <option >Tên: A--Z </option>
                                            <option >Tên: Z--A </option>
                                            <option >Cũ nhất</option>
                                            <option >Bán chạy nhất</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="tshirts__content">
                                <div className="row">
                                    {
                                        viewProduct.map((item, index) => {
                                            return (
                                                item.category_id === 5 ?
                                                    <div key={index} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                                        <div className="content__product">
                                                            <Link to="" className="content__product-item">
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
                                                                    <div className="content__product-price--item1">{item.price}.000đ</div>
                                                                    <del className="content__product-price--item2">390.000đ</del>
                                                                </div>
                                                                <div className="content__product-new">new</div>
                                                                <div className="content__product-sale">-78%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : index === 1 ? <h1 key={index} className="col-lg-4 col-md-4 col-sm-6 col-xs-6 error" >Chưa có sản phẩm này</h1> : ""
                                            )
                                        })
                                    }


                                </div>
                            </div>
                            {/*  <div className="tshirts__more">
                                <div className="row">
                                    <div className="col l-12">
                                        <div className="tshirts__more--text">
                                            <Link to="/">Xem thêm {viewProduct.length - 10} sản phẩm khác</Link>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Jacker;