import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function ViewProduct() {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [message,setMessage] = useState('');

    //Xử lý search
    const handleInput = (e) => {
        if (e.key === 'Enter') {
            setMessage(e.target.value);
        }
    }

    const slug = message;
    useEffect(() => {
        if (slug != "") {
            axios.get(`/api/search/${slug}`).then(res => {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                }
                else if (res.data.status === 404) {

                }
            });
        }
    }, [message])

    //Xử lý xuất dữ liệu
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

    //Xử lý xóa
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
    console.log(viewProduct)
    var display_Productdata = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        display_Productdata = viewProduct.map((item, index) => {
            return (
                <tr id={item.id} key={index}>
                    <td className='fs-4 text'>{item.id}</td>
                    <td className='fs-4 text'>{item.name}</td>
                    <td className='fs-4 text'>{item.categorys.name}</td>
                    <td className='fs-4 text'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                    <td className='fs-4 text'>{item.promotion ? item.promotion.discount+"%":"0%"}</td>
                    <td className='fs-4 text'>{item.promotion ? Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.price * item.promotion.discount)/100) : Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) }</td>
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
        });
    }
    return (
        <div className="container px-4 mt-3">
                <input type="text" placeholder="Nhập tên sản phẩm cần tìm kiếm..." className="admin__search--input" style={{margin:"20px",marginLeft:"0"}} onKeyDown={handleInput} />
            <div className="card">
                <div className="card-header">
                    <h2>Danh sách sản phẩm
                        <Link to="/admin/add-product" className="btn btn-primary btn-lg float-end fs-4 text">Thêm sản phẩm</Link>
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
                                    <th>Giá gốc</th>
                                    <th>Khuyến mãi</th>
                                    <th>Giá đã được giảm</th>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;