import { faChevronRight, faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";
import MenuCategory from "../../layouts/frontend/MenuCategory";
import Im from "../../assets/frontend/img/detail/lss.png";

function CategoryList() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);

    const productCount = product.length;

    const [shouldRefresh, setRefresh] = useState(false);
    const [message, setMessage] = useState('')

    const callbackFunction = (childData) => {
        setMessage(childData)
        setRefresh(!shouldRefresh);
    }
    const [productitem, setProductItem] = useState([]);


    //sắp xếp
    function handleOption(e) {
        if (e.target.value == 'Tên: A--Z') {
            const result = product.sort(function (a, b) {
                let left = a.name;
                let right = b.name;
                return left === right ? 0 : left > right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (e.target.value == 'Tên: Z--A') {
            const result = product.sort(function (a, b) {
                let left = a.name;
                let right = b.name;
                return left === right ? 0 : left < right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (e.target.value == 'Mới nhất') {
            const result = product.sort(function (a, b) {
                let left = a.id;
                let right = b.id;
                return left === right ? 0 : left < right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (e.target.value == 'Cũ nhất') {
            const result = product.sort(function (a, b) {
                let left = a.id;
                let right = b.id;
                return left === right ? 0 : left > right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (e.target.value == 'Giá:Tăng dần') {
            const result = product.sort(function (a, b) {
                let left = a.price;
                let right = b.price;
                return left === right ? 0 : left > right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (e.target.value == 'Giá:Giảm dần') {
            const result = product.sort(function (a, b) {
                let left = a.price;
                let right = b.price;
                return left === right ? 0 : left < right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
    }

    //phân trang
    /*  const [currentPage, setCurrentPage] = useState(1);
 
     const currentTableData = useMemo(() => {
         const firstPageIndex = (currentPage - 1) * PageSize;
         const lastPageIndex = firstPageIndex + PageSize;
         return product.slice(firstPageIndex, lastPageIndex);
     }, [currentPage, product]); */

    //xử lý hiện sản phẩm
    const { slug } = useParams();
    useEffect(() => {
        document.title = "Danh sách sản phẩm"
        let isMounted = true;
        const category_slug = slug;
        axios.get(`/api/fetchproducts/${category_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    setProductItem(res.data.product_data.product);
                    setLoading(false);
                }
                else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "");
                }
                else if (res.data.status === 404) {
                    history('/');
                    swal("Warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [slug, history]);

    //Xử lý bộ lọc
    useEffect(() => {
        if (message == 1) {
            const result = productitem.filter(function (a) {
                return a.price <= 200000;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (message == 2) {
            setProduct(product);
            const result = productitem.filter(function (a) {
                return a.price >= 200000 && a.price <= 400000;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (message == 3) {
            setProduct(product);
            const result = productitem.filter(function (a) {
                return a.price >= 400000 && a.price <= 800000;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (message == 4) {
            setProduct(product);
            const result = productitem.filter(function (a) {
                return a.price >= 800000;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
    }, [message])

    //xuất dữ liệu 
    let showProductsList = "";
    let load = "";
    if (loading) {
        load = (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    else {
        if (productCount) {
            showProductsList = product.map((item, index) => {
                if (item.quantityM == 0 && item.quantityL == 0 && item.quantityXL == 0) {
                    return (
                        <div key={index} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                            <div className="content__product">
                                <div className="content__product-item">
                                    <img src={`http://localhost:8000/${item.image}`}
                                        className="content__product-img">
                                    </img>
                                    <img src={Im}
                                        className="content__product-img2">
                                    </img>
                                    <p className="content__product-text">
                                        {item.name}
                                    </p>
                                </div>
                                <div className="content-product-item2">
                                    <div className="content__product-text2">
                                        VERGENCY
                                    </div>
                                    <div className="content__product-evaluate">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                    <div className="content__product-price">
                                        <div className="content__product-price--item1 error">
                                            Hết hàng
                                        </div>
                                    </div>
                                    <div className="content__product-new">new</div>
                                    {item.promotion ? <div className="content__product-sale">{"-" + item.promotion.discount + "%"}</div> : ""}
                                </div>
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={index} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                            <div className="content__product">
                                <Link to={`/${item.categorys.name}/${item.id}`} className="content__product-item">
                                    <img src={`http://localhost:8000/${item.image}`}
                                        className="content__product-img">
                                    </img>
                                    <p className="content__product-text">
                                        {item.name}
                                    </p>
                                </Link>
                                <div className="content-product-item2">
                                    <div className="content__product-text2">
                                        VERGENCY
                                    </div>
                                    <div className="content__product-evaluate">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                    <div className="content__product-price">
                                        {item.promotion ?
                                            <div className="content__product-price--item1">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.price * (100 - item.promotion.discount)) / 100)}</div> :
                                            <div className="content__product-price--item1">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</div>}
                                        {item.promotion ? <del className="content__product-price--item2">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</del> : ""}
                                    </div>
                                    <div className="content__product-new">new</div>
                                    {item.promotion ? <div className="content__product-sale">{"-" + item.promotion.discount + "%"}</div> : ""}
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
        else {
            showProductsList = <h2 className="error" style={{ textAlign: "center", paddingTop: "30px" }}>Hiện tại sản phẩm đang cập nhật. Bạn quay lại sau nhé !</h2>
        }
    }

    return (
        <React.Fragment>
            <Header />
            {load == "" ?
                (<>
                    <div className="app__container" id="ssa">
                        <div className="grid wide">
                            <div className="row">
                                <div className="app__container--category">
                                    <Link to="/" className="app__container--link">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                    <div className="app__container--link">Danh mục</div>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                    <p className="app__container--text">{category.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid wide">
                            <div className="row">
                                <MenuCategory parentCallback={callbackFunction} />
                                <div className="col l-9">
                                    <div className="tshirts__title">
                                        <h3 className="tshirts__title--heading">{category.name}</h3>
                                        <div className="tshirts__title--sort">
                                            <p className="tshirts__title--text" style={{ marginBottom: "0" }}>Sắp xếp:</p>
                                            <div className="tshirts__title--option">
                                                <select onChange={e => { handleOption(e) }} id="search" className="tshirts__title--select">
                                                    <option >Cũ nhất</option>
                                                    <option >Mới nhất</option>
                                                    <option >Giá:Tăng dần</option>
                                                    <option >Giá:Giảm dần</option>
                                                    <option >Tên: A--Z</option>
                                                    <option >Tên: Z--A</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tshirts__content">
                                        <div className="row">
                                            {showProductsList}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Footer />
                </>
                ) : load}
        </React.Fragment>
    );
}

export default CategoryList;