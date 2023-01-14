import React, { useState, useEffect } from 'react';
import { Route, Redirect, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import MasterLayout from './layouts/admin/MasterLayout';
import swal from 'sweetalert';

function AdminPrivateRoute() {

    const history = useNavigate();

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(() => {

        axios.get(`/api/checkingAuthenticated`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setloading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal("Thông báo","Vui lòng đăng nhập trước khi truy cập!", "warning");
            history('/')
        }
        return Promise.reject(err);
    });
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403) // Access Denied
        {
            swal("Thông báo", error.response.data.message, "warning");
            history('/403');
        }
        else if (error.response.status === 404) //Page Not Found
        {
            swal("404 Lỗi", "Trang này không tồn tại!", "warning");
            history('/404');
        }
        return Promise.reject(error);
    }
    );

    if (loading) {
        return (
            <div className="spinner">
                <div className="blob blob-0"></div>
            </div>
        )
    }

    return (
        Authenticated ? <MasterLayout /> : <Navigate to="/login" />

    );
}

export default AdminPrivateRoute;
