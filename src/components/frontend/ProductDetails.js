import { faCartShopping, faCheck, faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";
import axios from "axios";
import swal from "sweetalert";
import Form from 'react-bootstrap/Form';

function ProductDetails() {

    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [viewProduct, setViewProduct] = useState([]);
    const [viewImg, setViewImg] = useState([]);
    const [onSize, setOnSize] = useState([]);
    //xử lý số lượng
    const hanldeMinusQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }

    const hanldePlusQuantity = () => {
        setQuantity(prevCount => prevCount + 1);
    };

    //xử lý đổ dữ liệu
    const { categoryName } = useParams();
    const { id } = useParams();
    useEffect(() => {

        let isMounted = true;

        const category_slug = categoryName;
        const product_slug = id;
        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
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
    }, [categoryName, id, history]);


    //xử lý sản phẩm liên quan
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/home-product`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setViewProduct(res.data.products);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);
    var count = 0;
    var productList = ""
    if (loading) {
        return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    else {

        count = 0;
        productList = viewProduct.map((item) => {
            if (item.id != id && item.categorys.name === categoryName && count < 6) {
                count = count + 1;
                return (productList = (<li key={item.id} >
                    <div className="flexbox-grid-default">
                        <div className="abc flexbox-auto-100px">
                            <Link to={`/${item.categorys.name}/${item.id}`}>
                                <img className="dt-width-100" width="100" height="100" src={`http://localhost:8000/${item.image}`} />
                            </Link>
                        </div>
                        <div className="flexbox-content pd-l-10">
                            <Link to={`/${item.categorys.name}/${item.id}`}>
                                <h2>{item.name}</h2>
                                <p className="product-box-price-related clearfix flexbox-grid-default">
                                    <span className="price-new-related flexbox-content text-left">{item.price}.000₫</span>
                                    <del className="price-old-related flexbox-content">420,000₫</del>
                                </p>
                            </Link>
                        </div>
                    </div>
                </li>)
                )
            }
        })
    }

    //xử lý sự kiện thay đổi hình ảnh
    const hanldeImg = () => {
        setViewImg(1);
    }
    const hanldeImg2 = () => {
        setViewImg(2);
    }
    const hanldeImg3 = () => {
        setViewImg(3);
    }
    const hanldeImg4 = () => {
        setViewImg(4);
    }
    var bigImg = (<div className="product__img--big">
        <img src={`http://localhost:8000/${product.image}`} className="product__img--index" alt={product.name} />
    </div>)
    if (viewImg === 1) {
        bigImg = (<div className="product__img--big">
            <img src={`http://localhost:8000/${product.image}`} className="product__img--index" alt={product.name} />
        </div>)
    }
    else if (viewImg === 2) {
        bigImg = (<div className="product__img--big">
            <img src={`http://localhost:8000/${product.image2}`} className="product__img--index" alt={product.name} />
        </div>)
    }
    else if (viewImg === 3) {
        bigImg = (<div className="product__img--big">
            <img src={`http://localhost:8000/${product.image3}`} className="product__img--index" alt={product.name} />
        </div>)
    }
    else if (viewImg === 4) {
        bigImg = (<div className="product__img--big">
            <img src={`http://localhost:8000/${product.image4}`} className="product__img--index" alt={product.name} />
        </div>)
    }

    //Xử lý chuyển size
    const hanldeSizeclick = (e) => {
        if (e.target.className == "select__size--option activity") {
            e.target.classList.remove("activity");
        }
        else {
            e.target.classList.add('activity')
        }
        console.log(e.target.className /* == "activity" ? true : false */)
    }



    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <div className="grid wide">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5">
                            <div className="app__container--category">
                                <Link to="/" className="app__container--link">Trang chủ</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <p className="app__container--text">T-SHIRTS</p>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <p className="app__container--text">{product.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid wide">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 2 container__product">
                            <ul className="product__img--list">
                                <li className="product__img--item">
                                    <img src={`http://localhost:8000/${product.image}`} onClick={hanldeImg} className="product__img--image" alt={product.name} />
                                </li>
                                <li className="product__img--item">
                                    <img src={`http://localhost:8000/${product.image2}`} onClick={hanldeImg2} className="product__img--image" alt={product.name} />
                                </li>
                                <li className="product__img--item">
                                    <img src={`http://localhost:8000/${product.image3}`} onClick={hanldeImg3} className="product__img--image" alt={product.name} />
                                </li>
                                <li className="product__img--item">
                                    <img src={`http://localhost:8000/${product.image4}`} onClick={hanldeImg4} className="product__img--image" alt={product.name} />
                                </li>
                            </ul>
                            {bigImg}
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pd5 information-product">
                            <div className="product-title">
                                <h1>{product.name}</h1>
                            </div>
                            <div className="content__product-evaluate">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className="product-price" id="price-preview">
                                <h2 className="error">{product.price}.000đ</h2>
                                <del><h4>420,000₫</h4></del>
                            </div>
                            <form id="add-item-form" action="/cart/add" method="post" className="variants clearfix variant-style">
                                {/* <ul className="select__size">
                                    <li className="select__size--item">
                                        <input type="radio" className="select__size--option" onClick={hanldeSizeclick} value="M" />
                                        <label className="select__size--label">M</label>
                                    </li>
                                    <li className="select__size--item">
                                        <input type="radio" className="select__size--option" onClick={hanldeSizeclick} value="L" />
                                    </li>
                                    <li className="select__size--item">
                                        <input type="radio" className="select__size--option" onClick={hanldeSizeclick} value="XL" />
                                    </li>
                                </ul> */}
                                <div>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3 fs-2 text">
                                            <Form.Check
                                                inline
                                                label="M"
                                                name="size"
                                                type={type}
                                                id={`inline-${type}-1`}
                                            />
                                            <Form.Check
                                                inline
                                                label="L"
                                                name="size"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                            <Form.Check
                                                inline
                                                label="XL"
                                                name="size"
                                                type={type}
                                                id={`inline-${type}-3`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="select-wrapper clearfix fs-4 text">
                                        <label>Số lượng</label>
                                        <div className="input-group fs-4 text">
                                            <input type="button" value="-" onClick={hanldeMinusQuantity} className="qty-btn" />
                                            <div className="qty-btn fs-4 text text-center lh-lg p-2">{quantity}</div>
                                            <input type="button" value="+" onClick={hanldePlusQuantity} className="qty-btn" />
                                        </div>
                                    </div>
                                    <div className="clearfix button__buy">
                                        <button type="button" className="btn-style-add add-to-cart btn__cart">
                                            <FontAwesomeIcon className="button__buy--icon" icon={faCartShopping} />
                                            <span className="txt">Thêm vào giỏ</span>
                                        </button>
                                        <button type="button" className="btn-style-buynow addnow btn__cart">
                                            <FontAwesomeIcon className="button__buy--icon" icon={faCheck} />
                                            <span className="txt">Mua ngay</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2 col-xs-12 pd-none-box-service mb15 fs-4 text">
                            <div className="box-service-product">
                                <div className="header-box-service-product text-center">
                                    <div className="title">TIẾP ĐÓN</div>
                                    <div className="content">Được phục vụ Quý Khách hàng là niềm vinh dự đối với chúng tôi.</div>
                                </div>
                                <div className="content-box-service-product row">

                                    <div className="col-lg-12 col-sm-3 col-xs-12">
                                        <div className="border-service-product">
                                            <div className="flexbox-grid-default">
                                                <div className="flexbox-auto-45px flexbox-align-self-center">
                                                    <img className="dt-width-auto" width="32" height="32" src="//theme.hstatic.net/200000305259/1000963148/14/icon-service-1.png?v=19" />
                                                </div>
                                                <div className="flexbox-content des-service-product">
                                                    <div className="title">GIAO HÀNG TOÀN QUỐC</div>
                                                    <div className="content">Thời gian giao hàng linh động từ 3 - 4 - 5 ngày tùy khu vực, đôi khi sẽ nhanh hơn hoặc chậm hơn. Mong Quý Khách hàng thông cảm và cố gắng đợi hàng giúp shop.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-3 col-xs-12">
                                        <div className="border-service-product">
                                            <div className="flexbox-grid-default">
                                                <div className="flexbox-auto-45px flexbox-align-self-center">
                                                    <img className="dt-width-auto" width="32" height="32" src="//theme.hstatic.net/200000305259/1000963148/14/icon-service-2.png?v=19" />
                                                </div>
                                                <div className="flexbox-content des-service-product">
                                                    <div className="title">CHÍNH SÁCH ĐỔI TRẢ HÀNG</div>
                                                    <div className="content">Sản phẩm được phép đổi hàng trong vòng 36h nếu phát sinh lỗi từ nhà sản xuất (Yêu cầu: hình ảnh phần bị lỗi rõ nét, chi tiết và đầy đủ).</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-3 col-xs-12">
                                        <div className="border-service-product">
                                            <div className="flexbox-grid-default">
                                                <div className="flexbox-auto-45px flexbox-align-self-center">
                                                    <img className="dt-width-auto" width="32" height="32" src="//theme.hstatic.net/200000305259/1000963148/14/icon-service-3.png?v=19" />
                                                </div>
                                                <div className="flexbox-content des-service-product">
                                                    <div className="title">GIAO HÀNG NHẬN TIỀN VÀ KIỂM KÊ ĐƠN HÀNG</div>
                                                    <div className="content">Được phép kiểm hàng trước khi thanh toán. Lưu ý: Trường hợp Quý Khách hàng đã nhận hàng về nhà, vui lòng quay video unbox đơn hàng trong tình trạng nguyên vẹn để có căn cứ xác thực đơn hàng gặp phải vấn đề, trường hợp không có video shop không thể hỗ trợ.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-3 col-xs-12">
                                        <div className="border-service-product">
                                            <div className="flexbox-grid-default">
                                                <div className="flexbox-auto-45px flexbox-align-self-center">
                                                    <img className="dt-width-auto" width="32" height="32" src="//theme.hstatic.net/200000305259/1000963148/14/icon-service-4.png?v=19" />
                                                </div>
                                                <div className="flexbox-content des-service-product">
                                                    <div className="title">ĐẶT HÀNG ONLINE VÀ KIỂM TRA ĐƠN HÀNG VUI LÒNG LIÊN HỆ</div>
                                                    <div className="content">037 335 7405</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-xs-12 pd5 fs-4 text">
                            <div className="product__description">
                                <div className="product__comment">
                                    <h2>MÔ TẢ SẢN PHẨM</h2>
                                </div>
                                <div className="product__comment--description">
                                    <p className="">{product.description}
                                    </p>
                                    <img src="//file.hstatic.net/200000305259/file/vgc-tee_size_chart_2022-01_8aa53b04f78c4d8a8b25f012856cd5a9_master.jpg" width="600" height="600" className="dt-width-auto"></img>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xs-12 pd5">
                            <div className="product__description">
                                <div className="product__comment">
                                    <h2>SẢN PHẨM LIÊN QUAN</h2>
                                </div>
                                <ul className="list-product-related">
                                    {productList}
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                            <div className=" ">
                                <div className="box-banner-index text-center mb15">
                                    <Link to="/collections/all">
                                        <img src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_2_grande.jpg?v=44" className="dt-width-100 lazyloaded" width="360" height="200" data-src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_2_grande.jpg?v=44" alt="banner 2" title="banner 2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                            <div className=" ">
                                <div className="box-banner-index text-center mb15">
                                    <Link to="/collections/all">
                                        <img src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_3_grande.jpg?v=44" className="dt-width-100 lazyloaded" width="360" height="200" data-src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_3_grande.jpg?v=44" alt="banner 3" title="banner 3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                            <div className=" ">
                                <div className="box-banner-index text-center mb15">
                                    <Link to="/collections/all">
                                        <img src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_1_grande.jpg?v=44" className="dt-width-100 lazyloaded" width="360" height="200" data-src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_1_grande.jpg?v=44" alt="banner 1" title="banner 1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment >
    );
}

export default ProductDetails;