import React, { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { faChevronRight, faEnvelope, faLocationDot, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/frontend/css/grid.css";
import Footer from "../../../layouts/frontend/Footer";
import Header from "../../../layouts/frontend/Header";
function Register() {

    const history = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        error_list: [],
    });

    useEffect(() => {
        document.title = "Đăng ký";
    },[])

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            address: registerInput.address,
            phone: registerInput.phone,
            role_as: 0,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 200) {
                    swal("Đăng ký Thành công", res.data.message, "success");
                    history('/login');
                }
                else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });

    };

    return (
        <React.Fragment>
            <Header />
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="/" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <p className="app__container--text">Đăng ký</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="app__container--formLogin">
                            <h1 className="formLogin__heading">
                                ĐĂNG KÝ
                            </h1>
                            <form onSubmit={registerSubmit}>
                                <div className="formLogin__email">
                                    <div className="formLogin__email--icon">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <input type="text" name="name" placeholder="Họ và Tên" onChange={handleInput} value={registerInput.name} className="formLogin__email--input" />
                                </div>
                                <span className='error fs-4 text'>{registerInput.error_list.name ? "Vui lòng nhập tên của bạn!" : ""}</span>
                                <div className="formLogin__email">
                                    <div className="formLogin__email--icon">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <input type="gmail" name="email" placeholder="Email" onChange={handleInput} value={registerInput.email} className="formLogin__email--input" />
                                </div>
                                <span className='error fs-4 text'>{registerInput.error_list.email == "The email has already been taken." ? "Email này đã được đăng ký!" : registerInput.error_list.email ? "Email không hợp lệ!" : ""}</span>
                                <div className="formLogin__password">
                                    <div className="formLogin__password--icon">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <input type="password" name="password" placeholder="Mật khẩu" onChange={handleInput} value={registerInput.password} className="formLogin__password--input" />
                                </div>
                                <span className='error fs-4 text'>{registerInput.error_list.password == "The password must be at least 8 characters." ? "Mật khẩu bắt buộc phải 8 kí tự trở lên!" : registerInput.error_list.password ? "Vui lòng nhập mật khẩu của bạn!" : ""}</span>
                                <div className="formLogin__email">
                                    <div className="formLogin__email--icon">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                    </div>
                                    <input type="text" name="address" placeholder="Địa chỉ" onChange={handleInput} value={registerInput.address} className="formLogin__email--input" />
                                </div>
                                <span className='error fs-4 text'>{registerInput.error_list.address ? "Vui lòng nhập địa chỉ của bạn!" : ""}</span>
                                <div className="formLogin__email">
                                    <div className="formLogin__email--icon">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>
                                    <input type="text" name="phone" placeholder="Số điện thoại" onChange={handleInput} value={registerInput.phone} className="formLogin__email--input" />
                                </div>
                                <span className='error fs-4 text'>{registerInput.error_list.phone ? "Vui lòng nhập số điện thoại của bạn!" : ""}</span>
                                <div className="formLogin__btn">
                                    <button type="submit" className="formLogin__btn--login">
                                        Đăng ký
                                    </button>
                                </div>
                            </form>
                            <div className="formLogin__register">
                                <Link to="/login" className="formLogin__register--link">
                                    Quay về
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

export default Register;

