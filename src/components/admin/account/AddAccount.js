import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function AddAccount() {
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        role_as: 0,
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value })
    }

    const submitAccount = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            address: registerInput.address,
            phone: registerInput.phone,
            role_as:(registerInput.role_as == 'Nhân viên' ? registerInput.role_as = 2 : registerInput.role_as = 0)
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 200) {
                    swal("Đăng ký Thành công", res.data.message, "success");
                }
                else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    return (
        <div className="container px-4 fs-4 text ">
            <div className="card mt-4">
                <div className="card-header ">
                    <h2 >Thêm tài khoản
                        <Link to="/admin/view-account" className="btn btn-primary btn-lg float-end fs-4 text">Xem tài khoản</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={submitAccount} encType="multipart/form-data">

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Họ và tên</label>
                                    <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control fs-4 text" />
                                    <small className="text-danger">{registerInput.error_list.name ? "Vui lòng nhập tên!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="gmail" name="email" onChange={handleInput} value={registerInput.email} className="form-control fs-4 text" />
                                    <small className="text-danger">{registerInput.error_list.email ? "Vui lòng nhập Email!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Địa chỉ</label>
                                    <textarea type="text" name="address" onChange={handleInput} value={registerInput.address} className="form-control fs-4 text" />
                                    <small className="text-danger">{registerInput.error_list.address ? "Vui lòng nhập Địa chỉ!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Số điện thoại</label>
                                    <input type="text" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control fs-4 text" />
                                    <small className="text-danger">{registerInput.error_list.phone ? "Vui lòng nhập số điện thoại!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Phân quyền</label>
                                    <select name="role_as" onChange={handleInput} value={registerInput.role_as} className="form-control fs-4 text" >
                                        <option>Lựa chọn</option>
                                        <option>Khách hàng</option>
                                        <option>Nhân viên</option>
                                    </select>
                                    <small className="text-danger">{registerInput.error_list.role_as ? "Vui lòng nhập Phân quyền!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Mật khẩu</label>
                                    <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control fs-4 text" />
                                    <small className="text-danger">{registerInput.error_list.password ? "Vui lòng nhập Mật khẩu!" : ""}</small>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg px-4 mt-2 float-end fs-4 text">Thêm tài khoản</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAccount;