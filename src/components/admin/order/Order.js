import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function Order() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    //đổ dữ liệu order
    useEffect(() => {
        document.title ="Danh sách đơn hàng";
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



    var display_order = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        display_order = orders.map((item, index) => {
            return (
                <tr id={item.id} key={index}>
                    <td className='fs-4 text'>{item.id}</td>
                    <td className='fs-4 text'>{item.user_id}</td>
                    <td className='fs-4 text'>{item.name}</td>
                    <td className='fs-4 text'>{item.phone}</td>
                    <td className='fs-4 text'>{item.address}</td>
                    <td className='fs-4 text'>{item.note}</td>
                    {item.status == 0 ?
                    <td className='fs-4 text' style={{color:'red',fontWeight:"bold",fontSize:"1.6rem"}}>Chưa xác nhận</td>:
                    <td className='fs-4 text'style={{color:'#0ccf0f',fontWeight:"bold",fontSize:"1.6rem"}}>Đã xác nhận</td>}
                    <td>
                        <Link to={`../detail-order/${item.id}`} className="btn btn-success btn-sm fs-4 text">Xem chi tiết</Link>
                    </td>
                </tr >
            )
        });
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
                                    <th>Trạng thái đơn hàng</th>
                                    <th>Xem chi tiết đơn hàng</th>
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