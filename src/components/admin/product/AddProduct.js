import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

function AddProduct() {
    const [categorylist, setCategorylist] = useState([]);
    const [productInput, setProduct] = useState({
        category_id: '',
        name: '',
        price: '',
        size: '',
        quantity: '',
        image: '',
    });
    const [pricture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }

    useEffect(() => {
        axios.get('api/all-category').then(res => {
            if (res.data.status === 200) {
                setProduct({
                    ...productInput,
                    category_id: '',
                    name: '',
                    price: '',
                    size: '',
                    quantity: '',
                    image: '',
                });
                setCategorylist(res.data.category);
            }
        })
    }, []);

    const submitProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', pricture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('name', productInput.name);
        formData.append('price', productInput.price);
        formData.append('size', productInput.size);
        formData.append('quantity', productInput.quantity);
        axios.post('api/store-product', formData).then(res => {
            if (res.data.status === 200) {
                swal('Thành công', res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                swal('Tất cả các trường là bắt buộc', "", "error");
                setError(res.data.errors);
            }
        });
    }
    return (
        <div className="container px-4 fs-4 text ">
            <div className="card mt-4">
                <div className="card-header ">
                    <h2 >Thêm sản phẩm
                        <Link to="/admin/view-product" className="btn btn-primary btn-lg float-end fs-4 text">Xem sản phẩm</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} encType="multipart/form-data">

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Loại sản phẩm</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control fs-4 text">
                                        <option>loại sản phẩm</option>
                                        {
                                            categorylist.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.category_id ? "Vui lòng nhập tên loại sản phẩm!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Tên</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control fs-4 text" />
                                    <small className="text-danger">{errorlist.name ? "Vui lòng nhập tên sản phẩm!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Giá bán</label>
                                    <input type="text" name="price" onChange={handleInput} value={productInput.price} className="form-control fs-4 text" />
                                    <small className="text-danger">{errorlist.price ? "Vui lòng nhập giá tiền!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>kích thước</label>
                                    <select name="size" onChange={handleInput} value={productInput.size} className="form-control fs-4 text" >
                                        <option>Kích thước</option>
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                        <option>XXL</option>
                                    </select>
                                    <small className="text-danger">{errorlist.size ? "Vui lòng nhập Kích thước!" : ""}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Số lượng</label>
                                    <input type="text" name="quantity" onChange={handleInput} value={productInput.quantity} className="form-control fs-4 text" />
                                    <small className="text-danger">{errorlist.quantity ? "Vui lòng nhập số lượng!" : ""}</small>
                                </div>
                                <div className="col-md-8 form-group mb-3">
                                    <label>Hình ảnh</label>
                                    <input type="file" name="image" onChange={handleImage} className="form-control fs-4 text" />
                                    <small className="text-danger">{errorlist.image ? "Vui lòng nhập hình ảnh!" : ""}</small>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg px-4 mt-2 float-end fs-4 text">Thêm sản phẩm</button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;