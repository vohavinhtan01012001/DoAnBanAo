import { faArrowRightFromBracket, faChevronRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import Footer from '../../layouts/frontend/Footer';
import Header from '../../layouts/frontend/Header';



function Account() {
    const history = useNavigate();
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
                                <p className='heading__exit--text'>Thoát</p>
                            </button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col l-8 m-12 c-12'>
                            <div className='app__container-product'>
                                <p className='product__notyet--text'>Bạn chưa đặt mua sản phẩm</p>
                            </div>
                        </div>
                        <div className='col l-4 m-12 c-12'>
                            <div className='app_container-account'>
                                <div className='container__account-name'>
                                    <span>Họ tên </span>
                                    <span>:</span>
                                    <span>{name}</span>
                                </div>
                                <div className='container__account-name'>
                                    <span>Email </span>
                                    <span>:</span>
                                    <span>{email}</span>
                                </div>
                                <div className='container__account-name'>
                                    <span>Địa chỉ </span>
                                    <span>:</span>
                                    <span>{address}</span>
                                </div>
                                <div className='container__account-name'>
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