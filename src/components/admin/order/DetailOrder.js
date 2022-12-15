import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function DetailOrder() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [ordersItems, setOrderItems] = useState([]);
    const [order, setOrder] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        let isMounted = true;
        document.title = "Chi tiết đơn hàng";
        const order_id = id;
        axios.get(`/api/detail-order/${order_id}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrderItems(res.data.orderItems);
                    setLoading(false);
                }
                else if (res.data.status === 404) {
                    history('/');
                    swal("Warning", res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, [id, history]);

    useEffect(() => {
        let isMounted = true;
        const order_id = id;
        axios.get(`/api/id-orders/${order_id}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrder(res.data.order);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, [id]);

    //Xử lý xác nhận đơn hàng
    const uploadOrder = (e) => {
        e.preventDefault();
        const order_id = id;
        axios.post(`/api/update-order/${order_id}`).then(res => {
            if (res.data.status === 200) {
                history('/admin/order');
            }
        })
    }

    var sumPrice = 0;
    var display_detailOrder = "";
    var display_button = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        display_detailOrder = ordersItems.map((item, index) => {
            sumPrice += item.sumPrice;
            return (
                sumPrice,
                <tr id={item.id} key={index}>
                    <td className='fs-4 text'>{item.id}</td>
                    <td className='fs-4 text'>{item.order_id}</td>
                    <td className='fs-4 text'>{item.product_id}</td>
                    <td className='fs-4 text'>{item.product.name}</td>
                    <td className='fs-4 text'>{item.qtyM}</td>
                    <td className='fs-4 text'>{item.qtyL}</td>
                    <td className='fs-4 text'>{item.qtyXL}</td>
                    <td className='fs-4 text'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                    {item.product.promotion ?
                        <td className='fs-4 text'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.price * (100 - item.product.promotion.discount))/100)}</td> :
                        <td className='fs-4 text'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                    }
                    <td className='fs-4 text'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sumPrice)}</td>
                </tr >
            )
        });
        order.map(e => e.status) == 0 ?
            display_button = (<button className="btn btn-primary btn-lg float-end fs-4 text" style={{ background: "red", border: "none" }} onClick={(e) => {
                swal({
                    title: "Thông báo!",
                    text: "Bạn chắc chắn là xác nhận đơn?",
                    icon: "info",
                    buttons: [
                        'Không',
                        'Có'
                    ],
                    dangerMode: true,
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        swal({
                            title: 'Thành công!',
                            text: 'Đã xác nhận đơn hàng!',
                            icon: 'success'
                        }).then(function () {
                            uploadOrder(e);
                        });
                    } else {

                    }
                })
            }}>Xác nhận đơn hàng</button>) :
            display_button = (<button disabled className="btn btn-primary btn-lg float-end fs-4 text" style={{ background: "red", border: "none" }}>Đã xác nhận</button>)
    }
    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h2>Danh sách đơn hàng
                        <Link to="/admin/order" className="btn btn-primary btn-lg float-end fs-4 text">quay lại</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Mã chi tiết đơn hàng</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng(M)</th>
                                    <th>Số lượng(L)</th>
                                    <th>Số lượng(XL)</th>
                                    <th>Giá tiền ban đầu</th>
                                    <th>Giá tiền đã áp dụng khuyến mãi</th>
                                    <th>Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_detailOrder}
                            </tbody>
                        </table>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h2>Tổng tiền cần thanh toán:</h2>
                            <h2 className='error'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice + 30000)}</h2>
                        </div>
                        <div><p style={{ textAlign: "center" }}>(Đã tính thêm tiền phí vận chuyển 30.000đ)</p></div>
                        {display_button}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailOrder;