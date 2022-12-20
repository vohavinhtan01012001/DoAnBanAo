import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Pay() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [onAddress, setAddress] = useState(false);


    if (!localStorage.getItem('auth_token')) {
        history('/login');
        swal("Thông báo", "Vui lòng đăng nhập để tiếp tục!", "warning");
    }

    const [checkoutInput, setCheckoutInput] = useState({
        name: '',
        phone: '',
        address: '',
        note: '',
    });
    const [error, setError] = useState([]);


    //Đổ dữ liệu cart
    useEffect(() => {
        document.title = "Thanh toán";
        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    history('/login');
                    swal('Warning', res.data.message, "warning");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [history]);
    if (cart.length == 0) {
        history('/cart')
    }

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            name: checkoutInput.name,
            phone: checkoutInput.phone,
            address: checkoutInput.address,
            note: checkoutInput.note,
        }
        axios.post(`/api/place-order`, data).then((res) => {
            if (res.data.status === 200) {
                swal("Mua hàng thành công", res.data.message, "success");
                setError([]);
                history("/");
            }
            else if (res.data.status === 422) {
                swal("Vui lòng nhập đầy đủ thông tin!", "", "error");
                setError(res.data.errors);
            }
        });
    }


    const handlAccount = (e) => {
        e.preventDefault();
        if (!onAddress) {
            setAddress(true);
        }
    }

    const handlAccountFalse = (e) => {
        e.preventDefault();
        if (onAddress) {
            setAddress(false);
        }
    }

    var formAddress = "";

    if (onAddress) {
        formAddress = (
            <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Họ và tên người nhận</Form.Label>
                    <Form.Control disabled onChange={handleInput} name="name" value={checkoutInput.name = localStorage.getItem("auth_name")} className='fs-4 text' style={{ padding: "10px" }} type="email" placeholder="Họ và tên..." />
                    <Form.Text className="fs-5 text " style={{ color: "red" }}>
                        {error.name == "The name field is required." ? "Vui lòng nhập tên!" : ""}
                    </Form.Text>
                </Form.Group><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Địa chỉ người nhận</Form.Label>
                    <Form.Control disabled onChange={handleInput} name="address" value={checkoutInput.address = localStorage.getItem("auth_address")} className='fs-4 text' style={{ padding: "10px" }} type="email" placeholder="Địa chỉ..." />
                    <Form.Text className="fs-5 text " style={{ color: "red" }}>
                        {error.address == "The address field is required." ? "Vui lòng nhập địa chỉ!" : ""}
                    </Form.Text>
                </Form.Group><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control disabled onChange={handleInput} name="phone" value={checkoutInput.phone = localStorage.getItem("auth_phone")} className='fs-4 text' style={{ padding: "10px" }} type="email" placeholder="Số điện thoại..." />
                    <Form.Text className="fs-5 text " style={{ color: "red" }}>
                        {error.phone == "The phone field is required." ? "Vui lòng nhập số điện thoại!" : ""}
                    </Form.Text>
                </Form.Group>
            </>
        )
    }
    else {
        formAddress = (
            <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Họ và tên người nhận</Form.Label>
                    <Form.Control onChange={handleInput} name="name" value={checkoutInput.name} className='fs-4 text' style={{ padding: "10px" }} type="email" placeholder="Họ và tên..." />
                    <Form.Text className="fs-5 text " style={{ color: "red" }}>
                        {error.name == "The name field is required." ? "Vui lòng nhập tên!" : ""}
                    </Form.Text>
                </Form.Group><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Địa chỉ người nhận</Form.Label>
                    <Form.Control onChange={handleInput} name="address" value={checkoutInput.address} className='fs-4 text' style={{ padding: "10px" }} type="email" placeholder="Địa chỉ..." />
                    <Form.Text className="fs-5 text " style={{ color: "red" }}>
                        {error.address == "The address field is required." ? "Vui lòng nhập địa chỉ!" : ""}
                    </Form.Text>
                </Form.Group><Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control onChange={handleInput} name="phone" value={checkoutInput.phone} className='fs-4 text' style={{ padding: "10px" }} type="email" placeholder="Số điện thoại..." />
                    <Form.Text className="fs-5 text " style={{ color: "red" }}>
                        {error.phone == "The phone field is required." ? "Vui lòng nhập số điện thoại!" : ""}
                    </Form.Text>
                </Form.Group>
            </>
        )
    }
    /* var orderinfo_data = {
        name: checkoutInput.name,
        phone: checkoutInput.phone,
        address: checkoutInput.address,
        payment_mode: 'Paid by PayPal',
        payment_id: '',
    } */

    var sumPrice = 0;
    var products = "";
    if (loading) {
        return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    else {
        if (cart.length > 0) {
            products = cart.map((item, index) => {
                if (item.product.promotion) {
                    sumPrice += (((item.product.price * (100 - item.product.promotion.discount)) / 100) * item.product_qty);
                }
                else {
                    sumPrice += (item.product.price * item.product_qty);
                }
                return (
                    <nav key={index} className="cart__product--item" style={{ paddingTop: "20px" }}>
                        <div>
                            <div className="cart__product--link2">
                                <img src={`http://localhost:8000/${item.product.image}`}
                                    alt="" className="cart__product--img" style={{ width: "80px", borderRadius: "10px" }} />
                                <p className='cart_product--link--text'>{item.product_qty}</p>
                            </div>
                        </div>
                        <div className="cart__product--content">
                            <div className="cart__product--contentRight">
                                <div className="cart__product--name" style={{ color: "#737373" }}>{item.product.name}</div>
                                <p className="cart__product--size" style={{ color: "#737373" }}>{item.size}</p>
                            </div>
                            <div className="cart__product--contentLeft">
                                {
                                    item.product.promotion ?
                                        <p className="cart__product--money" style={{ color: "#737373" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(((item.product.price * (100 - item.product.promotion.discount)) / 100) * item.product_qty)}</p> :
                                        <p className="cart__product--money" style={{ color: "#737373" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price * item.product_qty)}</p>
                                }
                            </div>
                        </div>
                    </nav>
                )
            })
        }
    }
    return (
        <React.Fragment>
            <div className='grid wide' style={{ paddingTop: "40px", paddingRight: "8px", paddingLeft: "8px" }}>
                <div className='row'>
                    <div className='col-lg-7 col-md-7 col-sm-12 col-xs-12'>
                        <div className="main-header">
                            <Link to="/" className="logo" style={{ textDecoration: "none", color: "black" }}>
                                <h1 className="logo-text">THANH TOÁN</h1>
                            </Link>
                            <ul className="breadcrumb fs-4 text">
                                <li className="breadcrumb-item fs ">
                                    <a href="/cart" style={{ textDecoration: "none" }}>Giỏ hàng</a>
                                </li>

                                <li className="breadcrumb-item breadcrumb-item-current">
                                    Thông tin giao hàng
                                </li>

                            </ul>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Button onClick={handlAccount} className='fs-3 text' variant="primary" type="button">
                                    Lấy thông tin của bạn
                                </Button>
                                <Button onClick={handlAccountFalse} className='fs-3 text' variant="primary" type="button" style={{ background: "#aaa", border: "none", padding: "5px", marginLeft: "20px" }}>
                                    Sửa thông tin
                                </Button>
                            </div>
                            <Form className='fs-4 text' style={{ paddingTop: "30px" }}>
                                {formAddress}
                                <div className="cart__note">
                                    <h2 className="cart__note--text" >Ghi chú đơn hàng</h2>
                                    <textarea  onChange={handleInput} name="note" value={checkoutInput.note} id="txtComment" className="fs-3 text" rows="8" cols="80"></textarea>
                                </div>
                                <div className="ship" style={{ paddingTop: "30px" }}>
                                    <h2>Phương thức thanh toán</h2>
                                    <div className='ship_content fs-4 text' style={{ display: "flex" }}>
                                        <p className='ship_content--text'>
                                            Giao hàng tận nơi (thời gian giao hàng dự kiến từ 3 ~ 4 ngày, có thể lâu hơn vì các vấn đề bất khả kháng, mong Quý KH đợi đơn hàng giúp shop. Chân thành cảm ơn)
                                        </p>
                                    </div>
                                </div>
                                <div className="ship" style={{ paddingTop: "30px" }}>
                                    <h2>Phương thức vận chuyển</h2>
                                    <div className='ship_content fs-4 text' >
                                        <p className='ship_content--text'>
                                            1. Khi click vào nút hoàn tất đơn hàng thì đơn hàng sẽ được nhân viên xác nhận qua gọi điện thoại, nếu thông tin địa chỉ và số điện thoại chính xác thì đơn hàng sẽ được vận chuyển từ 3-4-5 ngày tùy vùng miền.
                                        </p>
                                        <p> 2. Trường hợp đặt hàng xong nhưng muốn HỦY ĐƠN, vui lòng soạn tin nhắn theo cú pháp: SĐT ĐÃ ĐẶT ĐƠN (hoặc MÃ ĐƠN hoặc GMAIL ĐƠN HÀNG) + TÊN NGƯỜI NHẬN sau đó gửi qua các kênh online: Page Facebook, Intagram. Nhân viên check tin nhắn sẽ xử lý hủy giúp Quý KH.
                                        </p>
                                    </div>
                                </div>
                                <Button onClick={submitOrder} className='fs-3 text' style={{ marginTop: "30px", marginBottom: "30px", background: "red", border: "none", padding: "10px" }} variant="primary" type="submit">
                                    Hoàn tất đơn hàng
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12' style={{ boxShadow: "1px 0 0 #e1e1e1 inset" }}>
                        {products}
                        <div className='pay__product' style={{ paddingTop: "10px" }}>
                            <div className='pay__product--item fs-3 text'>
                                <p>Tạm tính</p>
                                <p>Phí vận chuyển</p>
                            </div>
                            <div className='pay__product--item fs-3 text'>
                                <p>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)}</p>
                                <p>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(30000)}</p>
                            </div>
                        </div>
                        <div className='pay__product' style={{ borderBottom: "none", paddingTop: "10px" }}>
                            <div className='pay__product--item fs-3 text'>
                                <h2 style={{ fontWeight: "bold" }}>Tổng tiền</h2>
                            </div>
                            <div className='pay__product--item fs-3 text'>
                                <h2 style={{ fontWeight: "bold" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice + 30000)}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Pay;