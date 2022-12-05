import { faArrowRight, faChevronRight, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../../../assets/frontend/css/grid.css";
import Footer from "../../../layouts/frontend/Footer";
import Header from "../../../layouts/frontend/Header";
function Login() {


    const history = useNavigate();

    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
        error_list: []
    });
    const handleInput = (e) => {
        e.persist();
        setLoginInput({
            ...loginInput,
            [e.target.name]: e.target.value,
        })
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post("/api/login", data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_email', res.data.email);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_address', res.data.address);
                    localStorage.setItem('auth_phone', res.data.phone);
                    if(res.data.role === 'admin'){
                        history('/admin/view-product');
                        window.location.reload();
                    }
                    else{
                        history('/');
                        window.location.reload();
                    }
                    swal('Đăng nhập thành công', res.data.message, 'success');
                }
                else if (res.data.status === 401) {
                    swal('Thông báo', res.data.message, 'warning');
                }
                else {
                    setLoginInput({ ...loginInput, error_list: res.data.validation_errors })
                }
            })
        });
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
                            <p className="app__container--text">Đăng nhập</p>
                        </div>
                    </div>
                    <div>
                        <div className="app__container--formLogin">
                            <h1 className="formLogin__heading">
                                ĐĂNG NHẬP
                            </h1>
                            <form onSubmit={loginSubmit}>
                                <div className="formLogin__email">
                                    <div className="formLogin__email--icon">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <input type="gmail" name="email" onChange={handleInput} value={loginInput.email} placeholder="Email" className="formLogin__email--input" />
                                </div>
                                <span className='error'>{loginInput.error_list.email ? "Vui lòng nhập Email của bạn!": ""}</span>
                                <div className="formLogin__password">
                                    <div className="formLogin__password--icon">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <input type="password" name="password" onChange={handleInput} value={loginInput.password} placeholder="Mật khẩu" className="formLogin__password--input" />
                                </div>
                                <span className='error'>{loginInput.error_list.password ? "Vui lòng nhập mật khẩu của bạn!": ""}</span>
                                <div className="formLogin__btn">
                                    <button type="submit" className="formLogin__btn--login">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                            <div className="formLogin__register">
                                <Link to="/register" className="formLogin__register--link">
                                    Đăng ký
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

export default Login;

