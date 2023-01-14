import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
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
import ViewAccount from "./components/admin/account/ViewAccount";
import CategoryList from "./components/frontend/CategoryList";
import ProductDetails from "./components/frontend/ProductDetails";
import Cart from "./components/frontend/Cart";
import Blog from "./components/frontend/static/Blog";
import Contact from "./components/frontend/static/Contact";
import About from "./components/frontend/static/About";
import Pay from "./components/frontend/Pay";
import Order from "./components/admin/order/Order";
import DetailOrder from "./components/admin/order/DetailOrder";
import Search from "./components/frontend/Search";
import OrderItems from "./components/frontend/order/OrderItems";
import ViewProductCate from "./components/admin/category/ViewProductCate";
import AddAccount from "./components/admin/account/AddAccount";
import ViewPromotion from "./components/admin/promotion/ViewPromotion";
import AddPromotion from "./components/admin/promotion/AddPromotion";
import EditPromotion from "./components/admin/promotion/EditPromotion";
import AddProductPor from "./components/admin/promotion/AddProductPor";
import ViewProductPor from "./components/admin/promotion/ViewProductPor";


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});


//xử lý refreshToken
/* axios.interceptors.response.use(
  (response) => response,
  async (error)=>{
    if(error.response.status === 401){
      try
        const token = localStorage.getItem('auth_token').refreshToken();
        localStorage.setItem("token", data.token);
      }
      catch(error){
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
); */


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
          <Route path="order/:id" element={<OrderItems />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/search" element={<Search />} />
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Register />} />
          <Route path="/account" element={localStorage.getItem('auth_token') ? <Account /> : <Navigate to="/" />} />
          <Route path="/address/:id" element={localStorage.getItem('auth_token') ? <Address /> : <Navigate to="/" />} />
          <Route path="/admin" name="Admin" element={<AdminPrivateRoute />} >
            <Route path='/admin/add-category' element={<Category />} />
            <Route path='/admin/view-category' element={<ViewCategory />} />
            <Route path='/admin/view-category/:id' element={<ViewProductCate />} />
            <Route path='/admin/edit-category/:id' element={<EditCategory />} />
            <Route path='/admin/add-product' element={<AddProduct />} />
            <Route path='/admin/view-product' element={<ViewProduct />} />
            <Route path='/admin/edit-product/:id' element={<EditProduct />} />
            <Route path='/admin/view-account' element={<ViewAccount />} />
            <Route path='/admin/add-account' element={<AddAccount />} />
            <Route path='/admin/order' element={<Order />} />
            <Route path='/admin/detail-order/:id' element={<DetailOrder />} />
            <Route path='/admin/view-promotion' element={<ViewPromotion />} />
            <Route path='/admin/view-promotion/:id' element={<ViewProductPor />} />
            <Route path='/admin/add-promotion' element={<AddPromotion />} />
            <Route path='/admin/edit-promotion/:id' element={<EditPromotion />} />
            <Route path='/admin/upload-productPor/:id' element={<AddProductPor />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
