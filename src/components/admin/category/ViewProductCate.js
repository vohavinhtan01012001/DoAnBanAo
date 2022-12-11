import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';


function ViewProductCate() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);


    useEffect(() => {
        let isMounted = true;
        document.title = "View Product";

        axios.get(`/api/view-product`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.products);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    //Xử lý xóa product
    const deleteProduct = (e, id) => {
        e.preventDefault();
        const thisclicked = e.target.closest('tr');
        axios.delete(`/api/delete-product/${id}`).then(res => {
            if (res.data.status === 200) {
                thisclicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal('Error', res.data.message, "error");
            }
        })
    }

    //Xử lý xóa category
    const deleteCategory = (e, id) => {
        e.preventDefault();
        axios.delete(`/api/delete-category/${id}`).then(res => {
            if (res.data.status === 200) {
                history('/admin/view-category');
            }
            else if (res.data.status === 404) {
                swal('Success', res.data.message, "success");
            }
        })
    }
    const { id } = useParams();
    const category_id = id;
    var display_Productdata = "";
    var display_DeleteButton = "";
    var indexA = 0;
    var category_name = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        if (viewProduct.length > 0) {
            display_Productdata = viewProduct.map((item, index) => {
                if (item.category_id == category_id) {
                    indexA++;
                    category_name = item.categorys.name.toLowerCase();
                    return (
                        <tr id={item.id} key={index}>
                            <td className='fs-4 text'>{item.id}</td>
                            <td className='fs-4 text'>{item.name}</td>
                            <td className='fs-4 text'>{item.categorys.name}</td>
                            <td className='fs-4 text'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                            <td className='fs-4 text'>{item.quantityM}</td>
                            <td className='fs-4 text'>{item.quantityL}</td>
                            <td className='fs-4 text'>{item.quantityXL}</td>
                            <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td>
                            <td><img src={`http://localhost:8000/${item.image2}`} width="50px" alt={item.name} /></td>
                            <td><img src={`http://localhost:8000/${item.image3}`} width="50px" alt={item.name} /></td>
                            <td><img src={`http://localhost:8000/${item.image4}`} width="50px" alt={item.name} /></td>
                            <td>{item.quantityL == 0 && item.quantityM == 0 && item.quantityXL == 0 ? <p style={{ color: 'red', fontWeight: "bold" }}>Hết hàng</p> : <p style={{ color: '#0ccf0f', fontWeight: "bold" }}>Còn hàng</p>}</td>
                            <td>
                                <Link to={`../edit-product/${item.id}`} className="btn btn-success btn-sm fs-4 text">Chỉnh sửa</Link>
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
                                                deleteProduct(e, item.id);
                                            });
                                        } else {

                                        }
                                    })
                                }} className='btn btn-danger btn-sm fs-4 text'>Xóa</button></td>
                        </tr >
                    )
                }
                else {
                    display_Productdata = "";
                }
            });
            if (indexA > 0) {
                display_DeleteButton = (<button type="button" onClick={(e) => {
                    swal('Warning', `Còn sản phẩm trong loại ${category_name} nên không xóa được `, 'warning')
                }} className='btn btn-danger btn-sm fs-4 text float-end p-3'>Xóa Loại sản phẩm</button>)
            }
            else {
                display_DeleteButton = (<button type="button" onClick={(e) => {
                    swal({
                        title: "Thông báo!",
                        text: "Bạn có chắc muốn xóa?",
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
                                deleteCategory(e, category_id);
                            });
                        } else {

                        }
                    })
                }} className='btn btn-danger btn-sm fs-4 text float-end p-3'>Xóa Loại sản phẩm</button>)
            }
        }
        else {
            display_Productdata = "";
            display_DeleteButton = "";
        }
    }
    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h2>Danh sách sản phẩm của loại {category_name}
                        <Link to="/admin/view-category" className="btn btn-primary btn-lg float-end fs-4 text">Quay lại</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Loại sản phẩm</th>
                                    <th>Giá bán</th>
                                    <th>Số lượng(M)</th>
                                    <th>Số lượng(L)</th>
                                    <th>Số lượng(XL)</th>
                                    <th>Hình ảnh</th>
                                    <th>Hình ảnh 2</th>
                                    <th>Hình ảnh 3</th>
                                    <th>Hình ảnh 4</th>
                                    <th>Trạng thái sản phẩm</th>
                                    <th>Chỉnh sửa</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Productdata}
                            </tbody>
                        </table>
                        {display_DeleteButton}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewProductCate;