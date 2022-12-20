import React, { useEffect } from 'react';
import Footer from '../../../layouts/frontend/Footer';
import Header from '../../../layouts/frontend/Header';
import about1 from "../../../assets/frontend/img/about/img1.png";
import about2 from "../../../assets/frontend/img/about/img2.png";
import about3 from "../../../assets/frontend/img/about/img3.png";

function About() {
    useEffect(() => {
        document.title = "Giới thiệu";
    },[])
    return ( 
        <React.Fragment>
            <Header />
            <div className='grid wide'>
                <div className='row'>
                    <div className="col-lg-12 col-xs-12 pd5">
        				<h1>
        					CÔNG TY TNHH VERGENCY
        				</h1>
        				<div className="clearfix page-description add-height-img fs-4 text">
        					<div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Ngoài thị trường&nbsp;họ chỉ quan tâm đến doanh thu, lợi nhuận. Còn chúng tôi&nbsp;thì tìm đủ mọi cách, làm bất cứ điều gì để khách hàng luôn cảm thấy hài lòng và hạnh phúc. Chúng tôi&nbsp;chưa dám nghĩ mình&nbsp;là số một, nhưng trong tương lai chúng tôi&nbsp;tự tin khẳng định sẽ&nbsp;mãi&nbsp;nỗ lực nâng cao,&nbsp;phát triển&nbsp;nhằm mục đích&nbsp;vươn lên đỉnh điểm về chất lượng dịch vụ và sản phẩm trong từng ngày, từng giờ, từng phút, từng giây, để đem lại cho khách hàng những item tinh tuý nhất, kèm theo đó là một mức giá phù hợp với&nbsp;túi tiền của tất cả mọi người.</div><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Chào mừng đến với Vergency! Hãy để chúng tôi có cơ hội được&nbsp;phục vụ bạn một cách chân thành và tận tâm hết sức có thể.</p>
                            <p ><img src={about1} width="600" height="600" className="dt-width-auto"/>
                            </p>
                            <p ><img src={about2}  width="600" height="600" className="dt-width-auto"/></p>
                            <p ><img src={about3}  width="600" height="600" className="dt-width-auto"/></p>
                            <p >&nbsp;</p>
                            <p >&nbsp;</p><p>&nbsp;</p>
        				</div>
        			</div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
     );
}

export default About;