import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function AddPromotion() {
    const [promotionInput, setPromotion] = useState({
        title: '',
        discount: '',
    });
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setPromotion({ ...promotionInput, [e.target.name]: e.target.value })
    }


    const submitPromotion = (e) => {
        e.preventDefault();

        const data = {
            discount: promotionInput.discount,
            title: promotionInput.title,
        }

        axios.post(`api/store-promotion`, data).then(res => {
            if (res.data.status === 200) {
                e.target.reset();
                swal("Success", res.data.message, "success");
            }
            else if (res.data.status === 400) {
                setError(res.data.errors);
            }
        });
    }

    return (
        <div className="container-lg px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h2>Thêm Khuyến mãi
                        <Link to="/admin/view-promotion" className="btn btn-primary btn-lg float-end fs-4 text">Xem khuyến mãi</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={submitPromotion} id="CATEGORY_FORM">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
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
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg px-4 float-end  fs-4 text">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPromotion;