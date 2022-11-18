import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";

function Cart() {
    const [quantity, setQuantity] = useState(1);
    const hanldeMinusQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }

    const hanldePlusQuantity = () => {
        setQuantity(prevCount => prevCount + 1);
    };

    return (
        <React.Fragment>
            <Header />
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5">
                            <div className="app__container--category">
                                <Link to="/" className="app__container--link">Trang chủ</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <p className="app__container--text">T-SHIRTS</p>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <p className="app__container--text">Giỏ hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app__container--cart">
                    <div className="grid wide">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h1 className="cart__product--text">
                                    Giỏ hàng
                                </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-sm-12 col-xs-12">
                                <div className="cart__product">

                                    <div className="cart__product--item">
                                        <Link to="/" className="cart__product--link">
                                            <img src="https://product.hstatic.net/200000305259/product/vgv-tee_art_v10_wht_2_c477e18bde8e406ab37ef977e491c00f_master.jpg"
                                                alt="" className="cart__product--img" />
                                        </Link>
                                        <div className="cart__product--content">
                                            <div className="cart__product--contentRight">
                                                <Link to="/" className="cart__product--name">CAMERA T-SHIRT/BLACK</Link>
                                                <p className="cart__product--size">L</p>
                                                <div className="cart__product--price">
                                                    <p className="cart__product--priceNow">69.000đ</p>
                                                    <del>(420.000đ)</del>
                                                </div>
                                                <div className="input-group fs-4 text">
                                                    <input type="button" value="-" onClick={hanldeMinusQuantity} className="qty-btn" />
                                                    <div className="qty-btn fs-4 text text-center lh-lg p-2">{quantity}</div>
                                                    <input type="button" value="+" onClick={hanldePlusQuantity} className="qty-btn" />
                                                </div>
                                            </div>
                                            <div className="cart__product--contentLeft">
                                                <div className="cart__product--delete">Xóa sản phẩm</div>
                                                <div className="cart__product--money">69.000đ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-12 col-xs-12">
                                    <div className="cart__note">
                                        <h2 className="cart__note--text">Ghi chú đơn hàng</h2>
                                        <textarea name="txtComment" id="txtComment" className="fs-3 text" rows="8" cols="80"></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-12 col-xs-12">
                                    <div className="cart__other">
                                        <Link to="/category/t-shirts" className="cart__other--text">TIẾP TỤC MUA SẢN PHẨM KHÁC</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-xs-12">
                                <div className="cart__order">
                                    <h1 className="cart__order--text">
                                        Đơn hàng
                                    </h1>
                                    <div className="cart__order--item">
                                        <div className="cart__order--content">
                                            <h2 className="cart__order--textMoney">
                                                Tổng tiền
                                            </h2>
                                            <h2 className="cart__order--price">
                                                69.000đ
                                            </h2>
                                        </div>
                                        <div className="cart__order--paying">
                                            <Link to="/" className="cart__order--link">
                                                THANH TOÁN
                                            </Link>
                                        </div>
                                    </div>
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

export default Cart;