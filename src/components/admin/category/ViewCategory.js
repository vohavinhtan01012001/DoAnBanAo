import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);


    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/view-category`).then(res => {
            if (isMounted) {
                if (res.status === 200) {
                    setCategorylist(res.data.category)
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    //Xử lý xóa
    const deleteCategory = (e, id) => {
        e.preventDefault();
        const thisClicked = e.target.closest('tr');
        axios.delete(`/api/delete-category/${id}`).then(res => {
            if (res.data.status === 200) {
                thisClicked.closest('tr').remove();
            }
            else if (res.data.status === 404) {
                swal('Success', res.data.message, "success");
            }
        })
    }



    var viewcategory_HTMLTABLE = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        viewcategory_HTMLTABLE =
            categorylist.map((item, index) => {
                return (
                    <tr id={item.id} key={index}>
                        <td className='fs-4 text'>{item.id}</td>
                        <td className='fs-4 text'>{item.name}</td>
                        <td className='fs-4 text'>{item.description}</td>
                        <td>
                            <Link to={`../edit-category/${item.id}`} className="btn btn-success btn-lg">Chỉnh sửa</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => {
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
                                        swal({
                                            title: 'Thành công!',
                                            text: 'Đã xóa thành công!',
                                            icon: 'success'
                                        }).then(function () {
                                            deleteCategory(e, item.id);
                                        });
                                    } else {

                                    }
                                })
                            }} className="btn btn-danger btn-lg">Xóa</button>
                        </td>
                    </tr>

                )
            });
    }
    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h2>Danh sách loại sản phẩm
                        <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end  fs-4 text">Thêm loại sản phẩm</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Chỉnh sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewcategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default ViewCategory;