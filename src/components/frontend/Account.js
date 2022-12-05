import { faArrowRightFromBracket, faChevronRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import Footer from '../../layouts/frontend/Footer';
import Header from '../../layouts/frontend/Header';



function Account() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    /*     const [account,setAccount] = useState({
            name:'',
            email:'',
        }); */
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_email');
                localStorage.removeItem('auth_address');
                localStorage.removeItem('auth_phone');
                localStorage.removeItem('mapbox.eventData.uuid:');
                window.location.reload();
                swal('Đăng xuất thành công', res.data.message, "success");
                history("/");
            }
        });
    }


    /*     axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post("/api/login").then(res => {
                if (res.data.status === 200) {
                    name = res.data.username
                }
            })
            }); */

    // Xử lý thông tin khách hàng
    var name = localStorage.getItem("auth_name");
    var email = localStorage.getItem("auth_email");
    var address = localStorage.getItem("auth_address");
    var phone = localStorage.getItem("auth_phone");

    //Đổ dữ liệu products
    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/view-orderItems`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.orderItems);
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [history]);

    var display_products = "";
    var display_ship = "";
    var sumPrice = 0;
    if (loading) {
        return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    else {
        if (product.length > 0) {
            display_products = product.map((item, index) => {
                sumPrice += item.product.price * (item.qtyM + item.qtyL + item.qtyXL)
                return (
                    <nav key={index} className="cart__product--item" style={{ paddingTop: "20px" }}>
                        <div>
                            <div className="cart__product--link2">
                                <img src={`http://localhost:8000/${item.product.image}`}
                                    alt="" className="cart__product--img" style={{ width: "80px", borderRadius: "10px" }} />
                                <p className='cart_product--link--text'>{item.qtyM + item.qtyL + item.qtyXL}</p>
                            </div>
                        </div>
                        <div className="cart__product--content">
                            <div className="cart__product--contentRight">
                                <div className="cart__product--name" style={{ color: "#737373" }}>{item.product.name}</div>
                                <p className="cart__product--size" style={{ color: "#737373" }}>{item.qtyM > 0 ? "M" : item.qtyL > 0 ? "L" : item.qtyXL > 0 ? "XL" : ""}</p>
                            </div>
                            <div className="cart__product--contentLeft">
                                <p className="cart__product--money" style={{ color: "#737373" }}>{item.product.price * (item.qtyM + item.qtyL + item.qtyXL)}.000đ</p>
                            </div>
                        </div>
                    </nav>
                )
            })
            display_ship = (<div>
                <h2 /* className='product__notyet--text' */ style={{ fontWeight: "bold", textAlign: "end", paddingTop: "20px", color: "#737373" }}>Tổng tiền: {sumPrice + 30}.000đ</h2>
            <h2 /* className='product__notyet--text' */ style={{ fontWeight: "bold", textAlign: "end", paddingTop: "20px", color: "#737373" }}>(Đã cộng thêm tiền vận chuyển) </h2>
            </div>)
        }
        else {
            display_products = <h2 className='product__notyet--text' style={{ fontWeight: "bold", paddingTop: "20px", color: "#737373" }}>Bạn chưa đặt mua sản phẩm</h2>
        }
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
                            <p className="app__container--text">Tài khoản</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='app__container--heading'>
                            <h2 className='heading__text'>Tài khoản của bạn</h2>
                            <button type='button' onClick={logoutSubmit} className='heading__exit'>
                                <div className='heading__exit--icon'>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                </div>
                                <p className='heading__exit--text' style={{ marginBottom: '0' }}>Đăng xuất</p>
                            </button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-8 col-md-12 col-xs-12 pd5'>
                            <div className='app__container-product'>
                                {display_products}
                                {display_ship}
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-12 col-xs-12 pd5'>
                            <div className='app_container-account'>
                                <div className='container__account-name'  style={{ fontWeight: "bold", paddingTop: "20px", color: "#737373" }}>
                                    <span>Họ tên </span>
                                    <span>:</span>
                                    <span>{name}</span>
                                </div>
                                <div className='container__account-name'  style={{ fontWeight: "bold", paddingTop: "20px", color: "#737373" }}>
                                    <span>Email </span>
                                    <span>:</span>
                                    <span>{email}</span>
                                </div>
                                <div className='container__account-name'  style={{ fontWeight: "bold", paddingTop: "20px", color: "#737373" }}>
                                    <span>Địa chỉ </span>
                                    <span>:</span>
                                    <span>{address}</span>
                                </div>
                                <div className='container__account-name'  style={{ fontWeight: "bold", paddingTop: "20px", color: "#737373" }}>
                                    <span>Điện thoại </span>
                                    <span>:</span>
                                    <span>{phone}</span>
                                </div>
                                <Link to="/address" className='app_container-edit'>
                                    <div className='app_container-edit--text' >Chỉnh sửa</div>
                                    <div className='app_container-edit--icon'>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Account;