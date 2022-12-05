import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function VỉewAccount() {
    const [loading, setLoading] = useState(true);
    const [viewAccount, setAccount] = useState([]);
    useEffect(() => {
        let isMounted = true;
        document.title = "View Account";

        axios.get(`/api/view-account`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setAccount(res.data.user);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    const deleteAccount = (e, id) => {
        e.preventDefault();
        const thisclicked = e.target.closest('tr');
        axios.delete(`/api/delete-account/${id}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, "success");
                thisclicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal('Warning', res.data.message, "warning");
            }
        })
    }

    var display_Accountdata = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        display_Accountdata = viewAccount.map((item, index) => {

            return (
                <tr id={item.id} key={index}>
                    <td className='fs-4 text'>{item.id}</td>
                    <td className='fs-4 text'>{item.name}</td>
                    <td className='fs-4 text'>{item.email}</td>
                    <td className='fs-4 text'>{item.address}</td>
                    <td className='fs-4 text'>{item.phone}</td>
                    <td className='fs-4 text'>{item.role_as === 1 ? "quản trị viên" : "khách hàng"}</td>
                    <td><button type="button" onClick={(e) => {
                        swal({
                            title: "Thông báo!",
                            text: "Bạn có chắc muốn xóa không!",
                            icon: "warning",
                            buttons: [
                                'No',
                                'Yes'
                            ],
                            dangerMode: true,
                        }).then(function (isConfirm) {
                            if (isConfirm) {
                                deleteAccount(e, item.id);
                            } else {

                            }
                        })
                    }} className='btn btn-danger btn-sm fs-4 text'>Xóa</button></td>
                </tr >
            )
        });
    }
    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h2>Danh sách tài khoản
                    </h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Mã tài khoản</th>
                                    <th>Tên </th>
                                    <th>Email</th>
                                    <th>Địa chỉ</th>
                                    <th>số điện thoại</th>
                                    <th>quản trị viên | khách hàng</th>
                                    <th>Xóa </th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Accountdata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VỉewAccount;