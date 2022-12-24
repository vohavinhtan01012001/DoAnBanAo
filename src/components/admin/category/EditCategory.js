import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {Link, useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';

function EditCategory() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categoryInput,setCategory] = useState([]);
    const [error, setError] = useState([]);

    const { id } = useParams();
    const category_id = id;
    useEffect(() => {
        document.title="Chỉnh sửa loại sản phẩm";
        axios.get(`/api/edit-category/${category_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/admin/view-category');
            }
            setLoading(false);
        });

    }, [category_id,history]);

    const handleInput = (e)=>{
        e.persist();
        setCategory({...categoryInput,[e.target.name]: e.target.value});
    }

    const updateCategory = (e) => {
        e.preventDefault();
        const category_id = id;
        const data = {
            name : categoryInput.name,
            description : categoryInput.description,
        };
        axios.put(`/api/upload-category/${category_id}`,data).then(res => {
            if(res.data.status === 200){
                swal("Success", res.data.message,'success');
                setError([])
            }
            else if(res.data.status === 422){
                setError(res.data.errors);
            }
            else if(res.data.status === 404){
                history('admin/view-category');
            }
        })
    }

    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }

    return ( 
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h2>Cập nhật loại sản phẩm 
                        <Link to="/admin/view-category" className="btn btn-primary btn-lg float-end  fs-4 text">Quay lại</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory} id="CATEGORY_FORM">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="form-group-lg mb-4">
                                    <label>Tên</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control form-control-lg fs-4 text" />
                                    <span className='text-danger'>{error.name ? "Vui lòng nhập tên loại sản phẩm!": ""}</span>
                                </div>
                                <div className="form-group-lg mb-4">
                                    <label>Miêu tả</label>
                                    <textarea type="text" name="description" onChange={handleInput} value={categoryInput.description} className="form-control form-control-lg fs-4 text"/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end fs-4 text">Cập nhật</button>
                    </form>

                </div>
            </div>
        </div>
     );
}

export default EditCategory;