import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);
    /* const [viewProduct, setProduct] = useState([]); */


    useEffect(() => {
        document.title ="Danh sách loại sản phẩm";
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

    /*     useEffect(() => {
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
        }, []); */


    var viewcategory_HTMLTABLE = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        viewcategory_HTMLTABLE = categorylist.map((item, index) => {
            return (
                <tr id={item.id} key={index}>
                    <td className='fs-4 text'>{item.id}</td>
                    <td className='fs-4 text'>{item.name}</td>
                    <td className='fs-4 text'>{item.description}</td>
                    <td>
                        <Link to={`../edit-category/${item.id}`} className="btn btn-success btn-lg">Chỉnh sửa</Link>
                    </td>
                    <td className='fs-4 text'><Link to={`${item.id}`} className="btn btn-success btn-lg">Xem sản phẩm </Link></td>
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
                                <th>Xem sản phẩm có trong loại</th>
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