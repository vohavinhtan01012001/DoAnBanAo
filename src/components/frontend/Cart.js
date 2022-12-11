import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from 'react-bootstrap/Button';
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";

function Cart() {
    ///
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    //Cập nhật số lượng
    const handleDecrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) => {
                if (cart_id === item.id) {
                    if (item.product_qty > 1) {
                        return ({ ...item, product_qty: item.product_qty - 1 });
                    }
                    else {
                        swal("warning", `số lượng tối thiểu là 1`, "warning")
                        return (item);
                    }
                }
                else {
                    return (item)
                }
            }
            )
        );
        updateCartQuantity(cart_id, "dec");
    }
    const handleIncrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) => {
                if (cart_id === item.id) {
                    if ((item.product_qty < item.product.quantityM && item.size == "M")
                        || (item.product_qty < item.product.quantityL && item.size == "L")
                        || (item.product_qty < item.product.quantityXL && item.size == "XL")) {
                        return ({ ...item, product_qty: item.product_qty + 1 });
                    }
                    else {
                        swal("warning", `size ${item.size} chỉ còn lại ${item.product_qty} sản phẩm`, "warning")
                        return (item);
                    }

                }
                else {
                    return (item)
                }
            }
            )
        );
        updateCartQuantity(cart_id, "inc");
    }
    //upload số lượng
    function updateCartQuantity(cart_id, scope) {
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
            if (res.data.status === 200) {
                /* swal("Success",res.data.message,"success"); */
            }
        });
    }

    //xóa product
    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        const thisClicked = e.target.closest('nav');

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res => {
            if (res.data.status === 200) {
                thisClicked.closest("nav").remove();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Xóa sản phẩm";
            }
        });
    }

    //Đổ dữ liệu cart
    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    history('/login');
                    swal('Warning', res.data.message, "warning");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [history]);

    var productList = ""
    var note = ""
    var productConti = ""
    var pay = ""
    var sumPrice = 0;
    if (loading) {
        return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    else {
        if (cart.length > 0) {
            productList = cart.map((item, index) => {
                sumPrice += (item.product.price * item.product_qty);
                return (
                    sumPrice,
                    <nav key={index} className="cart__product--item">
                        <div>
                            <Link to={`/${item.product.categorys.name}/${item.product_id}`} className="cart__product--link">
                                <img src={`http://localhost:8000/${item.product.image}`}
                                    alt="" className="cart__product--img" />
                            </Link>
                        </div>
                        <div className="cart__product--content">
                            <div className="cart__product--contentRight">
                                <Link to={`/${item.product.categorys.name}/${item.product_id}`} className="cart__product--name">{item.product.name}</Link>
                                <p className="cart__product--size">{item.size}</p>
                                <div className="cart__product--price">
                                    <p className="cart__product--priceNow">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price)}</p>
                                    <del>(420.000đ)</del>
                                </div>
                                <div className="input-group fs-4 text">
                                    <input type="button" value="-" onClick={() => handleDecrement(item.id)} className="qty-btn" />
                                    <div className="qty-btn fs-4 text text-center lh-lg p-2">{item.product_qty}</div>
                                    <input type="button" value="+" onClick={() => handleIncrement(item.id)} className="qty-btn" />
                                </div>
                            </div>
                            <div className="cart__product--contentLeft">
                                <div onClick={(e) => {
                                    /* if (window.confirm('Bạn có chắc muốn xóa không?')) {
                                        deleteCartItem(e, item.id);
                                    } */
                                    swal({
                                        title: "Thông báo!",
                                        text: "Bạn có chắc muốn xóa không!",
                                        icon: "warning",
                                        buttons: [
                                            'Không',
                                            'Có'
                                        ],
                                        dangerMode: true,
                                    }).then(function (isConfirm) {
                                        if (isConfirm) {
                                            swal({
                                                title: 'Thành công!',
                                                text: 'Đã xóa thành công!',
                                                icon: 'success'
                                            }).then(function () {
                                                deleteCartItem(e, item.id);
                                            });
                                        } else {

                                        }
                                    })
                                }} className="cart__product--delete" style={{ cursor: 'pointer' }}>Xóa sản phẩm</div>
                                <div className="cart__product--money">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price * item.product_qty)}</div>
                            </div>
                        </div>
                    </nav>
                )
            })
            note = (<div className="cart__note">
                <h2 className="cart__note--text">Ghi chú đơn hàng</h2>
                <textarea name="txtComment" id="txtComment" className="fs-3 text" rows="8" cols="80"></textarea>
            </div>)
            productConti = (
                <Button className="cart__other" style={{background:"black",border:"none"}}>
                    <Link to="/category/t-shirts" className="cart__other--text" style={{color:"white"}}>TIẾP TỤC MUA SẢN PHẨM KHÁC</Link>
                </Button>
            )
            pay = (<div className="cart__order">
                <h1 className="cart__order--text">
                    Đơn hàng
                </h1>
                <div className="cart__order--item">
                    <div className="cart__order--content">
                        <h2 className="cart__order--textMoney">
                            Tổng tiền
                        </h2>
                        <h2 className="cart__order--price">
                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)}
                        </h2>
                    </div>
                    <Button className="cart__order--paying" style={{background:"red",border:"none"}}>
                        <Link to="/pay" className="cart__order--link" style={{color:"white"}}>
                            THANH TOÁN
                        </Link>
                    </Button>
                </div>
            </div>)
        }
        else {
            productList = (<h2 className="error">Giỏ hàng của bạn đang trống!</h2>)
            note = ""
            productConti = (
                <div className="cart__other">
                    <Link to="/category/t-shirts" className="cart__other--text">TIẾP TỤC MUA SẢN PHẨM KHÁC</Link>
                </div>
            )
            pay = ""
        }
    }
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
                                    {productList}
                                </div>
                                <div className="col-lg-8 col-sm-12 col-xs-12">
                                    {note}
                                </div>
                                <div className="col-lg-8 col-sm-12 col-xs-12">
                                    {productConti}
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-xs-12">
                                {pay}
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