import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function DetailOrder() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const { id } = useParams();
    useEffect(() => {

        let isMounted = true;
        document.title = "Chi tiết đơn hàng";
        const order_id = id;
        axios.get(`/api/detail-order/${order_id}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrders(res.data.orderItems);
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

    //Xử lý xác nhận đơn hàng
    const deleteOrder = (e, id) => {
        e.preventDefault();
        axios.delete(`/api/delete-order/${id}`).then(res => {
            console.log(id);
            if (res.data.status === 200) {
                history('/admin/order');
            }
            else if (res.data.status === 404) {
                history("/admin/order");
                swal('Error', res.data.message, "error");
            }
        })
    }
    var sumPrice = 0;
    var display_detailOrder = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        display_detailOrder = orders.map((item, index) => {
            sumPrice += item.sumPrice;
            return (
                sumPrice,
                <tr id={item.id} key={index}>
                    <td className='fs-4 text'>{item.id}</td>
                    <td className='fs-4 text'>{item.order_id}</td>
                    <td className='fs-4 text'>{item.product_id}</td>
                    <td className='fs-4 text'>{item.qtyM}</td>
                    <td className='fs-4 text'>{item.qtyL}</td>
                    <td className='fs-4 text'>{item.qtyXL}</td>
                    <td className='fs-4 text'>{item.price}.000đ</td>
                    <td className='fs-4 text'>{item.sumPrice}.000đ</td>
                </tr >
            )
        });
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
                                    <th>Số lượng(M)</th>
                                    <th>Số lượng(L)</th>
                                    <th>Số lượng(XL)</th>
                                    <th>Giá tiền mỗi sản phẩm</th>
                                    <th>Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_detailOrder}
                            </tbody>
                        </table>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h2>Tổng tiền cần thanh toán:</h2>
                            <h2 className='error'>{sumPrice + 30}.000đ</h2>
                        </div>
                        <div><p style={{textAlign:"center"}}>(Đã tính thêm tiền phí vận chuyển 30.000đ)</p></div>
                        <button className="btn btn-primary btn-lg float-end fs-4 text" style={{ background: "red", border: "none" }} onClick={(e) => {
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
                                        deleteOrder(e, id);
                                    });
                                } else {

                                }
                            })
                        }}>Xác nhận đơn hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailOrder;