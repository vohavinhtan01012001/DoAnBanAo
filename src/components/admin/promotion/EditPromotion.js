import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function EditPromotion() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [promotionInput, setPromotion] = useState([]);
    const [errorlist, setError] = useState([]);

    const { id } = useParams();
    const promotion_id = id;
    useEffect(() => {
        axios.get(`/api/edit-promotion/${promotion_id}`).then(res => {
            if (res.data.status === 200) {
                setPromotion(res.data.promotion);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history('/admin/view-promotion');
            }
            setLoading(false);
        });

    }, [promotion_id, history]);

    const handleInput = (e) => {
        e.persist();
        setPromotion({ ...promotionInput, [e.target.name]: e.target.value });
    }

    const updatePromotion = (e) => {
        e.preventDefault();
        const promotion_id = id;
        const data ={
            title: promotionInput.title,
            discount: promotionInput.discount,
        }
        axios.put(`/api/upload-promotion/${promotion_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, 'success');
                setError([])
            }
            else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                history('admin/view-promotion');
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
                    <h2>Cập nhật Khuyến mãi
                        <Link to="/admin/view-promotion" className="btn btn-primary btn-lg float-end  fs-4 text">Quay lại</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={updatePromotion} id="CATEGORY_FORM">
                        <div className="tab-content" id="myTabContent">
                            <div className="form-group-lg mb-4">
                                <label>Tiêu đề chương trình khuyến mãi</label>
                                <input type="text" name="title" onChange={handleInput} value={promotionInput.title} className="form-control form-control-lg fs-4 text" />
                                <span className='error'>{errorlist.title ? "Vui lòng nhập tiêu đề!" : ""}</span>
                            </div>
                            <div className="form-group-lg mb-4">
                                <label>Giá trị khuyến mãi(đơn vị %)</label>
                                <input type="text" name="discount" onChange={handleInput} value={promotionInput.discount} className="form-control form-control-lg fs-4 text" />
                                <span className='error'>{errorlist.discount ? "Vui lòng nhập giá trị khuyến mãi!" : ""}</span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end fs-4 text">Cập nhật</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default EditPromotion;