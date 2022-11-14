import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function EditAccount() {
    const [accountInput, setAccount] = useState([]);
    const [error, setError] = useState([]);
    const [looading, setLoading] = useState(true);
    const history = useNavigate();

    const handleInput = (e) => {
        e.persist();
        setAccount({ ...accountInput, [e.target.name]: e.target.value });
    }

    const { id } = useParams();
    const account_id = id;
    useEffect(() => {
        axios.get(`/api/edit-account/${account_id}`).then(res => {
            if (res.data.status === 200) {
                /* console.log(res.data.account); */
                setAccount(res.data.user);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history('/admin/view-account')
            }
            setLoading(false);
        })
    }, [account_id, history]);

    const updateAccount = (e) => {
        e.preventDefault();
        const account_id = id;
        const data = accountInput;
        axios.post(`api/update-account/${account_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                swal('All fields are mandetory', "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal('error', res.data.message, "error");
                history('/admin/view-account')
            }
        });
    }
    if (looading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }

    return ( 
        <div className="container px-4 fs-4 text ">
            <div className="card mt-4">
                <div className="card-header ">
                    <h2 >Cập nhật Tài khoản
                        <Link to="/admin/view-account" className="btn btn-primary btn-lg float-end fs-4 text">Danh sách tài khoản</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={updateAccount} encType="multipart/form-data">

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Tên</label>
                                    <input type="text" name="name" onChange={handleInput} value={accountInput.name} className="form-control fs-4 text" />
                                    <small className="text-danger">{error.name ? "Vui lòng nhập tên tài khoản!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email"  value={accountInput.email} className="form-control fs-4 text" disabled/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Địa chỉ</label>
                                    <input type="text" name="address" onChange={handleInput} value={accountInput.address} className="form-control fs-4 text" />
                                    <small className="text-danger">{error.address ? "Vui lòng nhập địa chỉ!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Số điện thoại</label>
                                    <input type="text" name="phone" onChange={handleInput} value={accountInput.phone} className="form-control fs-4 text" />
                                    <small className="text-danger">{error.phone ? "Vui lòng nhập số điện thoại!" : ""}</small>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg px-4 mt-2 float-end fs-4 text">Cập nhật</button>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default EditAccount;