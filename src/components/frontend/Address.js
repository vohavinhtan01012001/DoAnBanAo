import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";

function Address() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [addressInput, setAddress] = useState([]);
    const [error, setError] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        document.title = "Thông tin của bạn";
        const address_id = id;
        axios.get(`/api/edit-account/${address_id}`).then(res => {
            if (res.data.status === 200) {
                setAddress(res.data.user);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history('/account');
            }
            setLoading(false);
        });

    }, [id, history]);

    const handleInput = (e) => {
        e.persist();
        setAddress({ ...addressInput, [e.target.name]: e.target.value });
    }

    const updateAddress = (e) => {
        e.preventDefault();
        const data = {
            name: addressInput.name,
            address: addressInput.address,
            phone: addressInput.phone,
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/edit-user', data).then(res => {
                if (res.data.status === 200) {
                    swal("Đăng ký Thành công", res.data.message, "success");
                    localStorage.setItem('auth_name', data.name);
                    localStorage.setItem('auth_address', data.address);
                    localStorage.setItem('auth_phone', data.phone);
                }
               /*  else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                } */
            });
        });



        /* const address_id = id;

        const data = {
            name: addressInput.name,
            address: addressInput.address,
            phone: addressInput.phone,
        };
        axios.put(`/api/upload-account/${address_id}`,data).then(res => {
            if(res.data.status === 200){
                swal("Success", res.data.message,'success');
                setError([])
            }
            else if(res.data.status === 422){
                setError(res.data.errors);
            }
            else if(res.data.status === 404){
                swal("Success", res.data.message,'success');
                history('/account');
            }
        }) */
    }
    let load = "";
    if (loading) {
        load = (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    return (
        <React.Fragment>
            <Header />
            {load == "" ? 
            (<>
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
                                <form className="formAddress" onSubmit={updateAddress}>
                                    <div className="formLogin__email">
                                        <input type="text" onChange={handleInput} value={addressInput.name} name="name" placeholder='Họ và tên' className="formLogin__email--input" />
                                    </div>
                                    <div className="formLogin__email">
                                        <input type="text" onChange={handleInput} value={addressInput.address} name="address" placeholder="Địa chỉ" className="formLogin__password--input" />
                                    </div>
                                    <div className="formLogin__email">
                                        <input type="text" onChange={handleInput} value={addressInput.phone} name="phone" placeholder="Số điện thoại" className="formLogin__password--input" />
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
            </>):load}
        </React.Fragment>
    );
}

export default Address;