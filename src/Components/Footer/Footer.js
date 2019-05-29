import React from 'react';
import './Footer.css';
import PostWrapper from '../PostWrapper/PostWrapper';

const Footer = () => (
  <div className="Footer">
    <PostWrapper>
      <div className="FooterHeading">
        <p className="BizDesc">
        <a href="https://k2.biscuitlabs.io/terms/ko">이용약관</a><br/>
        <a href="https://k2.biscuitlabs.io/privacy/ko">개인 정보 보호</a><br/>
        <br/>
        사업자등록번호: 142-88-01183<br/>
        대표이사: 이제빈, 신명진<br/>
        주소: 서울특별시 서초구 강남대로 373 홍우빌딩 15층<br/>
        </p>
        <p className="CompanyName">
          ©Biscuit Labs
        </p>
      </div>
    </PostWrapper>
  </div>
)

export default Footer;