import { faEnvelope, faHandHoldingUsd, faLock, faPhoneVolume, faStar, faSync, faTruckMoving } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../layouts/frontend/Footer";
import Header from "../../layouts/frontend/Header";
import Slider from "../../assets/frontend/img/slide/1.jpg";

function Home() {
    const [viewProduct, setViewProduct] = useState([]);
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/view-product`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setViewProduct(res.data.products);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);



    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <div className="slide">
                    {/* <ul class="riot-slider" data-do-console-log="true" data-use-material-icons="true"
                        data-is-auto-play="true" data-do-show-buttons="none" data-do-swipe-on-touchscreen="true"
                        data-button-number-display="never" data-previous-next-display="sides" data-theme="default"
                        data-slide-hold-seconds="3">
                        <li>
                            <img src="../../../img/slide/1.jpg" alt="Alt Text" />
                        </li>
                        <li>
                            <img src="/img/slide/2.jpg" alt="Alt Text" />
                        </li>
                    </ul> */}
                    <img src={Slider} className="slide__img2" />
                </div>
                <div className="documents">
                    <div className="grid wide">
                        <div className="row">
                            <div className="col-md-3 col-sm-3 col-xs-12 pd-r-5 text-center pd5">
                                <div className="documents__content">
                                    <div className="documents__content-icon">
                                        <FontAwesomeIcon icon={faTruckMoving} />
                                    </div>
                                    <div className="documents__content-document">
                                        <h2 className="documents__content-title">
                                            GIAO H??NG TO??N QU???C
                                        </h2>
                                        <p className="documents__content-text">
                                            V?? t??nh h??nh d???ch covid c??n nh???y c???m n??n th???i gian giao h??ng c?? th??? l??u h??n d???
                                            ki???n, mong qu?? kh??ch h??ng c???m th??ng v?? c??? g???ng ?????i h??ng gi??p shop.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 pd-r-5 text-center pd5">
                                <div className="documents__content">
                                    <div className="documents__content-icon">
                                        <FontAwesomeIcon icon={faSync} />
                                    </div>
                                    <div className="documents__content-document">
                                        <h2 className="documents__content-title">
                                            CH??NH S??CH ?????I TR??? H??NG
                                        </h2>
                                        <p className="documents__content-text">
                                            S???n ph???m ???????c ph??p ?????i h??ng trong v??ng 36h n???u ph??t sinh l???i t??? nh?? s???n xu???t
                                            (Y??u
                                            c???u: h??nh ???nh ph???n b??? l???i r?? n??t, chi ti???t v?? ?????y ?????).
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 pd-r-5 text-center pd5">
                                <div className="documents__content">
                                    <div className="documents__content-icon">
                                        <FontAwesomeIcon icon={faHandHoldingUsd} />
                                    </div>
                                    <div className="documents__content-document">
                                        <h2 className="documents__content-title">
                                            GIAO H??NG NH???N TI???N V?? KI???M K?? ????N H??NG
                                        </h2>
                                        <p className="documents__content-text">
                                            ???????c ph??p ki???m h??ng tr?????c khi thanh to??n. L??u ??: Tr?????ng h???p Qu?? kh??ch ???? nh???n
                                            h??ng
                                            v??? nh??, vui l??ng quay video unbox s???n ph???m trong t??nh tr???ng nguy??n v???n ????? c?? th???
                                            ch???ng minh shop giao nh???m ho???c thi???u s???n ph???m, tr?????ng h???p kh??ng c?? video shop
                                            kh??ng
                                            th??? h??? tr???.
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 pd-r-5 text-center pd5">
                                <div className="documents__content">
                                    <div className="documents__content-icon">
                                        <FontAwesomeIcon icon={faPhoneVolume} />
                                    </div>
                                    <div className="documents__content-document">
                                        <h2 className="documents__content-title">
                                            ?????T H??NG ONLINE V?? KI???M TRA ????N H??NG VUI L??NG LI??N H???
                                        </h2>
                                        <p className="documents__content-text">
                                            Hotline: 0378189209.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col l-12">
                                <div className="documents__content-document2">
                                    <h2 className="documents__content-title2">
                                        C??NG TY TNHH VERGENCY
                                    </h2>
                                    <p className="documents__content-text2">
                                        T???o ra nhi???u s???n ph???m cao c???p nh??ng gi?? th??nh h???p d???n, ??em ?????n ??i???u b???t ng??? v?? nh???ng
                                        tr???i nghi???m th?? v??? k??m theo s??? h??i l??ng, ni???m tin tuy???t ?????i cho kh??ch h??ng. ???? l?? s???
                                        m???nh c???a ch??ng t??i.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid wide">
                        <div className="document__timess">
                            <div className="documents__time">
                                <div className="documents__time-hh ">
                                    23
                                </div>
                                <p className="documents__time-text">ng??y</p>
                            </div>
                            <div className="documents__time">
                                <div className="documents__time-hh ">
                                    23
                                </div>
                                <p className="documents__time-text">gi???</p>
                            </div>
                            <div className="documents__time">
                                <div className="documents__time-hh ">
                                    59
                                </div>
                                <p className="documents__time-text">ph??t</p>
                            </div>
                            <div className="documents__time">
                                <div className="documents__time-hh ">
                                    59
                                </div>
                                <p className="documents__time-text">gi??y</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="main-content" className="">
                    <div className="grid wide content">
                        <div className="row">
                            {
                                viewProduct.map((item, index) => {
                                    return (
                                        index < 10 ?
                                            <div key={index} className="col-lg-3 col-md-4 col-sm-4 col-xs-6 ">
                                                <div className="content__product">

                                                    <Link to="" className="content__product-item">
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
                                                            <div className="content__product-price--item1">{item.price}.000??</div>
                                                            <del className="content__product-price--item2">390.000??</del>
                                                        </div>
                                                        <div className="content__product-new">new</div>
                                                        <div className="content__product-sale">-78%</div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ""
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            <div className="col l-12 m-12 c-12">
                                <div className="content__btn">
                                    <Link to="/t-shirts">XEM T???T C???</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l-12 m-12 c-12">
                                <div className="content__foorter-slogan">
                                    <div className="content__foorter-left"></div>
                                    <div className="content__foorter-headding">
                                        <h1 className="content__foorter-title">
                                            TH????NG HI???U
                                        </h1>
                                        <p className="content__foorter-text">
                                            Th????ng hi???u n???i b???t c???a ch??ng t??i
                                        </p>
                                    </div>
                                    <div className="content__footer-right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid wide content">

                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                <div className="content__category">
                                    <div className="content__category-item">
                                        <Link to="/t-shirts" className="content__category-link">
                                            <img src="//theme.hstatic.net/200000305259/1000869166/14/banner_index_1.jpg?v=43"
                                                alt="Banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                <div className="content__category">
                                    <div className="content__category-item">
                                        <Link to="/shirts" className="content__category-link">
                                            <img src="//theme.hstatic.net/200000305259/1000869166/14/banner_index_2.jpg?v=43"
                                                alt="Banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                <div className="content__category">
                                    <div className="content__category-item">
                                        <Link to="/sweaters" className="content__category-link">
                                            <img src="//theme.hstatic.net/200000305259/1000869166/14/banner_index_3.jpg?v=43"
                                                alt="Banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                <div className="content__category">
                                    <div className="content__category-item">
                                        <Link to="/hoodies" className="content__category-link">
                                            <img src="//theme.hstatic.net/200000305259/1000869166/14/banner_index_4.jpg?v=43"
                                                alt="Banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l-12 m-12 c-12">
                                <div className="content__foorter-slogan">
                                    <div className="content__foorter-left"></div>
                                    <div className="content__foorter-headding">
                                        <h1 className="content__foorter-title">
                                            BEST SELLER
                                        </h1>
                                        <p className="content__foorter-text">
                                            PRODUCTS ARE SOLD OUT VERY QUICKLY
                                        </p>
                                    </div>
                                    <div className="content__footer-right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content__foorter">
                    <div className="grid wide">

                        <div className="row">
                            <div className="col m-4 c-12">
                                <div className="content__logo-imgs">
                                    <Link to="" className="content__logo-link">
                                        <img src="//theme.hstatic.net/200000305259/1000869166/14/partner_1.png?v=27"
                                            className="content__logo-img" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col m-4 c-12">
                                <div className="content__logo-imgs">
                                    <Link to="" className="content__logo-link">
                                        <img src="//theme.hstatic.net/200000305259/1000869166/14/partner_3.png?v=27"
                                            className="content__logo-img" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col m-4 c-12">
                                <div className="content__logo-imgs">
                                    <Link to="" className="content__logo-link">
                                        <img src="//theme.hstatic.net/200000305259/1000869166/14/partner_2.png?v=27"
                                            className="content__logo-img" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Home;

