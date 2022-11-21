import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


function ViewProduct() {
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

    //Xử lý xóa
    const deleteProduct = (e, id) => {
        e.preventDefault();
        const thisclicked = e.currentTarget;
        axios.delete(`/api/delete-product/${id}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, "success");
                thisclicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal('Success', res.data.message, "success");
                thisclicked.innerText = "Xóa";
            }
        })
    }

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
                    <td className='fs-4 text'>{item.price}.000đ</td>
                    <td className='fs-4 text'>{item.quantityM}</td>
                    <td className='fs-4 text'>{item.quantityL}</td>
                    <td className='fs-4 text'>{item.quantityXL}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td>
                    <td><img src={`http://localhost:8000/${item.image2}`} width="50px" alt={item.name} /></td>
                    <td><img src={`http://localhost:8000/${item.image3}`} width="50px" alt={item.name} /></td>
                    <td><img src={`http://localhost:8000/${item.image4}`} width="50px" alt={item.name} /></td>
                    <td>
                        <Link to={`../edit-product/${item.id}`} className="btn btn-success btn-sm fs-4 text">Chỉnh sửa</Link>
                    </td>
                    <td><button type="button" onClick={(e) => {
                        if (window.confirm('Bạn có chắc muốn xóa không?')) {
                            deleteProduct(e, item.id);
                        }
                    }} className='btn btn-danger btn-sm fs-4 text'>Xóa</button></td>
                </tr >
            )
        });
    }
    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h2>Xem sản phẩm
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
                                    <th>Giá bán</th>
                                    <th>Số lượng(M)</th>
                                    <th>Số lượng(L)</th>
                                    <th>Số lượng(XL)</th>
                                    <th>Hình ảnh</th>
                                    <th>Hình ảnh 2</th>
                                    <th>Hình ảnh 3</th>
                                    <th>Hình ảnh 4</th>
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