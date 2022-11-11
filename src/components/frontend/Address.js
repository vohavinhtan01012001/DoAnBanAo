import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";

function Address() {
    const history = useNavigate();
    const [address, setAddress] = useState({
        name: "",
        address: "",
        phone: "",
        error: "",
    });

    const handleInput = (e) => {
        e.persist();
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    const addressSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: address.name,
            address: address.address,
            phone: address.phone,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/address', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_address', res.data.address);
                    localStorage.setItem('auth_phone', res.data.phone);
                    swal("Thêm thành công", res.data.message, "success");
                    history('/account');
                    console.log(res.data.address)
                }
                else {
                    setAddress({ ...address, error: res.data.validation_errors });
                }
            });
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
                            <Link to="/Account" className="app__container--link">Tài khoản</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <p className="app__container--text">Địa chỉ</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='app__container--address'>
                            <h2 className="heading__text">Thông tin địa chỉ</h2>
                            <form className="formAddress" onSubmit={addressSubmit}>
                                <div className="formLogin__email">
                                    <input type="text" onChange={handleInput} value={address.name} name="name" placeholder='Họ và tên' className="formLogin__email--input" />
                                </div>
                                <div className="formLogin__email">
                                    <input type="text" onChange={handleInput} value={address.address} name="address" placeholder="Địa chỉ" className="formLogin__password--input" />
                                </div>
                                <div className="formLogin__email">
                                    <input type="text" onChange={handleInput} value={address.phone} name="phone" placeholder="Số điện thoại" className="formLogin__password--input" />
                                </div>
                                <div className="formAddress__btn">
                                    <button type="submit" className="formAddress__btn--Address">
                                        Cập nhật
                                    </button>
                                    <div className="formBack">
                                        <p>hoặc </p>
                                        <Link to='/account' className="formBack--text">Hủy</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Address;