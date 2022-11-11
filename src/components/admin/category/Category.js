import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function Category() {

    const [categoryInput, setCategory] = useState({
        name: '',
        descrip: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            name: categoryInput.name,
            description: categoryInput.descrip,
        }

        axios.post(`api/store-category`, data).then(res => {
            if (res.data.status === 200) {
                e.target.reset();
                swal("Success", res.data.message, "success");
                // document.getElementById('CATEGORY_FORM').reset();
            }
            else if (res.data.status === 400) {
                setCategory({ ...categoryInput, error_list: res.data.errors });
            }
        });

    }

    var display_errors = [];
    if (categoryInput.error_list) {
        display_errors = [
            categoryInput.error_list.name,
        ]
    }

    return (
        <div className="container-lg px-4">

            {
                display_errors.map((item, index) => {
                    return (<p className="mb-1" key={index}>{item}</p>)
                })
            }

            <div className="card mt-4">
                <div className="card-header">
                    <h2>Thêm loại sản phẩm
                        <Link to="/admin/view-category" className="btn btn-primary btn-lg float-end fs-4 text">Xem loại sản phẩm</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={submitCategory} id="CATEGORY_FORM">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group-lg mb-4">
                                    <label>Tên</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control form-control-lg fs-4 text" />
                                </div>
                                <div className="form-group-lg mb-4">
                                    <label>Miêu tả</label>
                                    <textarea name="descrip" onChange={handleInput} value={categoryInput.descrip} className="form-control form-control-lg fs-4 text"></textarea>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg px-4 float-end  fs-4 text">Thêm</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Category;

