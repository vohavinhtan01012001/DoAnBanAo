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
    const [order, setOrder] = useState([]);
    const [viewAccount, setAccount] = useState([]);
    useEffect(() => {
        let isMounted = true;
        document.title = "Danh sách tài khoản";

        axios.get(`/api/view-accountAdd`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setAccount(res.data.user);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    var emailToken = localStorage.getItem('auth_email');
    var user_id = "";
    viewAccount.map((item,index)=>{
        if(item.email == emailToken) {
            user_id = item.id;
        }
        return user_id;
    })

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
                localStorage.removeItem('auth_role');
                window.location.reload();
                swal('Đăng xuất thành công', res.data.message, "success");
                history("/");
            }
        });
    }


    // Xử lý thông tin khách hàng
    var name = localStorage.getItem("auth_name");
    var email = localStorage.getItem("auth_email");
    var address = localStorage.getItem("auth_address");
    var phone = localStorage.getItem("auth_phone");


    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/home-order`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrder(res.data.orders);
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [])
    var display_products = "";
    var display_ship = "";
    var sumPrice = 0;
    var indexShow = 0;
    var i = 0;
    if (loading) {
        return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    else {
        if (order.length > 0) {
            display_products = order.map((item, index) => {
                if (item.user.email == email) {
                    indexShow = indexShow + 1;
                    return (
                        <div key={index} className='app__container-product' style={{ marginBottom: "20px" }}>
                            <div style={{ fontWeight: "bold", paddingLeft: "20px", paddingBottom: "20px", color: "#333", display: "block" }}>
                                <h2 style={{ fontWeight: "bold", marginRight: "10px" }}>Đơn hàng {indexShow} </h2>
                                <div className='container__account-name' style={{ fontWeight: "bold", color: "#333" }}>
                                    <span>Tên người nhận </span>
                                    <span>:</span>
                                    <span>{item.name}</span>
                                </div>
                                <div className='container__account-name' style={{ fontWeight: "bold", color: "#333" }}>
                                    <span>Địa chỉ người nhận </span>
                                    <span>:</span>
                                    <span>{item.address}</span>
                                </div>
                                <div className='container__account-name' style={{ fontWeight: "bold", color: "#333" }}>
                                    <span>Số điện thoại </span>
                                    <span>:</span>
                                    <span>{item.phone}</span>
                                </div>
                            </div>
                            <Link to={`/order/${item.id}`} className='container__account-name' style={{ fontWeight: "bold", color: "#333",textAlign:"end", textDecoration: "none" }}>
                                <span className='app_container-edit--text'>Xem chi tiết</span>
                            </Link>
                        </div>
                    )
                }
                else{
                    i = index;
                }
            })
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
                            <h2 style={{ fontWeight: "bold", paddingTop: "20px" }}>Danh sách đơn hàng</h2>
                            {/* {display_products[i - 1] == undefined || display_products[i + 1] == undefined ? <h2 style={{ paddingTop: "20px", color: "#333",textAlign:"center" }}>Bạn chưa đặt mua sản phẩm nào!</h2> : display_products } */}
                            {display_products}
                        </div>
                        <div className='col-lg-4 col-md-12 col-xs-12 pd5'>
                            <h2 style={{ fontWeight: "bold", paddingTop: "20px" }}>Thông tin của bạn</h2>
                            <div className='app_container-account'>
                                <div className='container__account-name' style={{ fontWeight: "bold", paddingTop: "20px", color: "#333" }}>
                                    <span>Họ tên </span>
                                    <span>:</span>
                                    <span>{name}</span>
                                </div>
                                <div className='container__account-name' style={{ fontWeight: "bold", paddingTop: "20px", color: "#333" }}>
                                    <span>Email </span>
                                    <span>:</span>
                                    <span>{email}</span>
                                </div>
                                <div className='container__account-name' style={{ fontWeight: "bold", paddingTop: "20px", color: "#333" }}>
                                    <span>Địa chỉ </span>
                                    <span>:</span>
                                    <span>{address}</span>
                                </div>
                                <div className='container__account-name' style={{ fontWeight: "bold", paddingTop: "20px", color: "#333" }}>
                                    <span>Điện thoại </span>
                                    <span>:</span>
                                    <span>{phone}</span>
                                </div>
                                <Link to={`/address/${user_id}`} className='app_container-edit'>
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