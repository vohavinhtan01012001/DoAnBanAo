import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function ViewPromotion() {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [promotionList, setPromotionList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/view-promotion`).then(res => {
            if (isMounted) {
                if (res.status === 200) {
                    setPromotionList(res.data.promotion)
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, []);


    //Xử lý xuất dữ liệu product
    useEffect(() => {
        let isMounted = true;
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
    const deletePromotion = (e, id) => {
        e.preventDefault();
        const thisclicked = e.target.closest('tr');
        axios.delete(`/api/delete-promotion/${id}`).then(res => {
            if (res.data.status === 200) {
                thisclicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal('Error', res.data.message, "error");
            }
        })
    }
    var productIndex = 0;
    var role = localStorage.getItem('auth_role');
    var viewpromotion_HTMLTABLE = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        if(role == 1){
            viewpromotion_HTMLTABLE = promotionList.map((item, index) => {
                productIndex = 0;
                viewProduct.map((product, index) => {
                    if (product.promotion_id == item.id) {
                        productIndex++;
                    }
                })
                return (
                    <tr id={item.id} key={index}>
                        <td className='fs-4 text'>{item.id}</td>
                        <td className='fs-4 text'>{item.title}</td>
                        <td className='fs-4 text'>{item.discount}%</td>
                        {productIndex >= 1 ?
                            <td className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đang hoạt động</td> :
                            <td className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa hoạt động</td>}
                        <td className='fs-4 text'><Link to={`${item.id}`} className="btn btn-success btn-lg">Xem sản phẩm </Link></td>
                        <td className='fs-4 text'><Link to={`../upload-productPor/${item.id}`} className="btn btn-success btn-lg">Thêm sản phẩm </Link></td>
                        <td>
                            <Link to={`../edit-promotion/${item.id}`} className="btn btn-success btn-lg">Chỉnh sửa</Link>
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
                                            deletePromotion(e, item.id);
                                        });
                                    } else {
    
                                    }
                                })
                            }} className='btn btn-danger btn-sm fs-4 text'>Xóa</button></td>
                    </tr>
                )
            });
        }
        else{
            viewpromotion_HTMLTABLE = promotionList.map((item, index) => {
                productIndex = 0;
                viewProduct.map((product, index) => {
                    if (product.promotion_id == item.id) {
                        productIndex++;
                    }
                })
                return (
                    <tr id={item.id} key={index}>
                        <td className='fs-4 text'>{item.id}</td>
                        <td className='fs-4 text'>{item.title}</td>
                        <td className='fs-4 text'>{item.discount}%</td>
                        {productIndex >= 1 ?
                            <td className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đang hoạt động</td> :
                            <td className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa hoạt động</td>}
                        <td className='fs-4 text'><Link to={`${item.id}`} className="btn btn-success btn-lg">Xem sản phẩm </Link></td>
                        <td className='fs-4 text'><Link to={`../upload-productPor/${item.id}`} className="btn btn-success btn-lg">Thêm sản phẩm </Link></td>
                        <td>
                            <Link to={`../edit-promotion/${item.id}`} className="btn btn-success btn-lg">Chỉnh sửa</Link>
                        </td>
                    </tr>
                )
            });
        }
    }
    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h2>Danh sách Khuyến mãi
                        <Link to="/admin/add-promotion" className="btn btn-primary btn-sm float-end  fs-4 text">Thêm chương trình khuyến mãi</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Mã khuyến mãi</th>
                                <th>Tiêu đề</th>
                                <th>Giá trị khuyến mãi(đơn vị %)</th>
                                <th>Trạng thái</th>
                                <th>Xem sản phẩm có sử dụng khuyến mãi</th>
                                <th>Thêm sản phẩm áp dụng khuyến mãi</th>
                                <th>Chỉnh sửa chương trình khuyến mãi</th>
                                {role == 1 ? <th>Xóa </th> : ""}
                            </tr>
                        </thead>
                        <tbody>
                            {viewpromotion_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewPromotion;