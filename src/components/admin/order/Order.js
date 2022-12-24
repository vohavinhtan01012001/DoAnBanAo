import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Order() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    //đổ dữ liệu order
    useEffect(() => {
        document.title = "Danh sách đơn hàng";
        let isMounted = true;
        axios.get(`/api/orders`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);


    var role = localStorage.getItem('auth_role');
    var display_order = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        if (role == 1) {
            display_order = orders.map((item, index) => {
                const date = new Date(item.created_at);
                return (
                    <tr id={item.id} key={index}>
                        <td className='fs-4 text'>{item.id}</td>
                        <td className='fs-4 text'>{item.user_id}</td>
                        <td className='fs-4 text'>{item.name}</td>
                        <td className='fs-4 text'>{item.phone}</td>
                        <td className='fs-4 text'>{item.address}</td>
                        <td className='fs-4 text'>{item.note}</td>
                        {item.status == 0 ?
                            <td className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa xác nhận</td> :
                            <td className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đã xác nhận</td>}
                        {item.pay == 0 ?
                            <td className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa thanh toán</td> :
                            <td className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đã thanh toán</td>}
                        <td className='fs-4 text'>{Intl.DateTimeFormat("vi-VN").format(date)}</td>
                        <td>
                            <Link to={`../detail-order/${item.id}`} className="btn btn-success btn-sm fs-4 text">Xem chi tiết</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => {
                                swal({
                                    title: "Thông báo!",
                                    text: "Bạn có chắc muốn xóa không!",
                                    icon: "warning",
                                    buttons: [
                                        'Không',
                                        'Có'
                                    ],
                                    dangerMode: true,
                                }).then(function (isConfirm) {
                                    if (isConfirm) {
                                        swal({
                                            title: 'Thành công!',
                                            text: 'Đã xóa thành công!',
                                            icon: 'success'
                                        }).then(function () {
                                            /* deleteProduct(e, item.id); */
                                        });
                                    } else {

                                    }
                                })
                            }} className='btn btn-danger btn-sm fs-4 text'>Xóa</button></td>
                    </tr >
                )
            });
        }
        else {
            display_order = orders.map((item, index) => {
                const date = new Date(item.created_at);
                return (
                    <tr id={item.id} key={index}>
                        <td className='fs-4 text'>{item.id}</td>
                        <td className='fs-4 text'>{item.user_id}</td>
                        <td className='fs-4 text'>{item.name}</td>
                        <td className='fs-4 text'>{item.phone}</td>
                        <td className='fs-4 text'>{item.address}</td>
                        <td className='fs-4 text'>{item.note}</td>
                        {item.status == 0 ?
                            <td className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa xác nhận</td> :
                            <td className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đã xác nhận</td>}
                        {item.pay == 0 ?
                            <td className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa thanh toán</td> :
                            <td className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đã thanh toán</td>}
                        <td className='fs-4 text'>{Intl.DateTimeFormat("vi-VN").format(date)}</td>
                        <td>
                            <Link to={`../detail-order/${item.id}`} className="btn btn-success btn-sm fs-4 text">Xem chi tiết</Link>
                        </td>
                    </tr >
                )
            });
        }
    }
    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h2>Danh sách đơn hàng
                    </h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Mã tài khoản</th>
                                    <th>Tên khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Ghi chú</th>
                                    <th>Trạng thái</th>
                                    <th>Thanh toán</th>
                                    <th>Ngày tạo</th>
                                    <th>Xem chi tiết đơn hàng</th>
                                    {role == 1 ? <th>Xóa</th> : ""}
                                </tr>
                            </thead>
                            <tbody>
                                {display_order}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;