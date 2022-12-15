import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Footer from '../../../layouts/frontend/Footer';
import Header from '../../../layouts/frontend/Header';

function OrderItems() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [ordersItems, setOrderItems] = useState([]);

    if (!localStorage.getItem('auth_token')) {
        history('/login');
        swal("Thông báo", "Vui lòng đăng nhập để tiếp tục!", "warning");
    }

    const { id } = useParams();
    useEffect(() => {
        let isMounted = true;
        const order_id = id;
        axios.get(`/api/home-orderItems/${order_id}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrderItems(res.data.orderItems);
                    setLoading(false);
                }
                else if (res.data.status === 404) {
                    history('/');
                    swal("Warning", res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, [id, history]);

    var display_products = "";
    var display_ship = "";
    var sumPrice = 0;
    if (loading) {
        return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    else {
        display_products = ordersItems.map((item, index) => {
            if(item.product.promotion){
                sumPrice += ((item.product.price * (100 - item.product.promotion.discount))/100) * (item.qtyM + item.qtyL + item.qtyXL)
            }
            else{
                sumPrice += item.product.price * (item.qtyM + item.qtyL + item.qtyXL)
            }
            return (
                <div key={index} className='app__container-product' style={{ marginBottom: "20px" }}>
                    <nav className="cart__product--item" style={{ paddingTop: "20px",borderBottom:"none" }}>
                        <div>
                            <div className="cart__product--link2">
                                <img src={`http://localhost:8000/${item.product.image}`}
                                    alt="" className="cart__product--img" style={{ width: "80px", borderRadius: "10px" }} />
                                <p className='cart_product--link--text'>{item.qtyM + item.qtyL + item.qtyXL}</p>
                            </div>
                        </div>
                        <div className="cart__product--content">
                            <div className="cart__product--contentRight">
                                <Link to={`/${item.product.categorys.name}/${item.product_id}`} className="cart__product--name" style={{ color: "#333" }}>{item.product.name}</Link>
                                <p className="cart__product--size" style={{ color: "#333" }}>{item.qtyM > 0 ? "M" : item.qtyL > 0 ? "L" : item.qtyXL > 0 ? "XL" : ""}</p>
                            </div>
                            <div className="cart__product--contentLeft">
                                {item.product.promotion ? 
                                <p className="cart__product--money" style={{ color: "#333" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(((item.product.price * (100 - item.product.promotion.discount))/100) * (item.qtyM + item.qtyL + item.qtyXL))}</p>:
                                <p className="cart__product--money" style={{ color: "#333" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price * (item.qtyM + item.qtyL + item.qtyXL))}</p>} 
                            </div>
                        </div>
                    </nav>
                </div>
            )
        })
        display_ship = (
            <div className='app__container-product' style={{ marginBottom: "20px" }}>
                <nav  /* className="cart__product--item" */ style={{ paddingTop: "20px" }}>
                    <h2 style={{ fontWeight: "bold", textAlign: "end", paddingTop: "20px", color: "#333" }}>Tổng tiền: {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND'}).format(sumPrice + 30000)}</h2>
                    <h2 style={{ fontWeight: "bold", textAlign: "end", paddingTop: "20px", color: "#333" }}>(Đã cộng thêm tiền vận chuyển) </h2>
                </nav>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Header />
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="/" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <Link to="/account" className="app__container--link">Tài khoản</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <p className="app__container--text">Đơn hàng </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-lg-8 col-md-12 col-xs-12 pd5'>
                            {display_products}
                        </div>
                        <div className='col-lg-4 col-md-12 col-xs-12 pd5'>
                            {display_ship}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default OrderItems;