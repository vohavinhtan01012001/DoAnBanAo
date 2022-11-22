import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom"
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import Home from "./components/frontend/Home";
import axios from "axios";
import Account from "./components/frontend/Account";
import Address from "./components/frontend/Address";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Page403 from "./components/errors/Page403";
import Page404 from "./components/errors/Page404";
import Category from "./components/admin/category/Category";
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";
import AddProduct from "./components/admin/product/AddProduct";
import ViewProduct from "./components/admin/product/ViewProduct";
import EditProduct from "./components/admin/product/EditProduct";
import AddAccount from "./components/admin/account/AddAccount";
import ViewAccount from "./components/admin/account/ViewAccount";
import EditAccount from "./components/admin/account/EditAccount";
import CategoryList from "./components/frontend/CategoryList";
import ProductDetails from "./components/frontend/ProductDetails";
import Cart from "./components/frontend/Cart";
import Blog from "./components/frontend/static/Blog";
import Contact from "./components/frontend/static/Contact";
import About from "./components/frontend/static/About";


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categoryName/:id" element={<ProductDetails />} />
          <Route path="/category/:slug" element={<CategoryList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Register />} />
          <Route path="/account" element={localStorage.getItem('auth_token') ? <Account /> : <Navigate to="/" />} />
          <Route path="/address" element={localStorage.getItem('auth_token') ? <Address /> : <Navigate to="/" />} />
          <Route path="/admin" name="Admin" element={<AdminPrivateRoute />} >
            <Route path='/admin/profile' element={<Profile />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/add-category' element={<Category />} />
            <Route path='/admin/view-category' element={<ViewCategory />} />
            <Route path='/admin/edit-category/:id' element={<EditCategory />} />
            <Route path='/admin/add-product' element={<AddProduct />} />
            <Route path='/admin/view-product' element={<ViewProduct />} />
            <Route path='/admin/edit-product/:id' element={<EditProduct />} />
            <Route path='/admin/add-account' element={<AddAccount />} />
            <Route path='/admin/view-account' element={<ViewAccount />} />
            <Route path='/admin/edit-account/:id' element={<EditAccount />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
