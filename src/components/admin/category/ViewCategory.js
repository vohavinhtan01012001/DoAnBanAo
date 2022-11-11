import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    //Xử lý delete modal
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false) };
    const handleShow = () => setShow(true);

    useEffect(() => {
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

    const deleteCategory = (e, id) => {
        e.preventDefault();
        const thisclicked = e.currentTarget;
        axios.delete(`/api/delete-category/${id}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, "success");
                document.getElementById(id).remove();
            }
            else if (res.data.status === 404) {
                swal('Success', res.data.message, "success");
                thisclicked.innerText = "Delete";
            }
        })
    }


    var viewcategory_HTMLTABLE = "";
    if (loading) {
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    else {
        viewcategory_HTMLTABLE =
            categorylist.map((item, index) => {
                return (
                    <tr id={item.id} key={index}>
                        <td className='fs-4 text'>{item.id}</td>
                        <td className='fs-4 text'>{item.name}</td>
                        <td className='fs-4 text'>{item.description}</td>
                        <td>
                            <Link to={`../edit-category/${item.id}`} className="btn btn-success btn-lg">Chỉnh sửa</Link>
                        </td>
                        <td>
                            <button type="button" onClick={handleShow} className="btn btn-danger btn-lg">Xóa</button>
                        </td>
                        <Modal className='fs-4 text' show={show} onHide={handleClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thông báo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Bạn có chắc muốn xóa không?</Modal.Body>
                            <Modal.Footer>
                                <Button className='fs-4 text' variant="secondary" onClick={handleClose}>
                                    Thoát
                                </Button>
                                <Button className='fs-4 text' variant="primary" onClick={(e) => { deleteCategory(e, item.id); setShow(false) }} >
                                    Xóa
                                </Button>
                            </Modal.Footer>
                        </Modal>
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
                                <th>Miêu tả</th>
                                <th>Chỉnh sửa</th>
                                <th>Xóa</th>
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