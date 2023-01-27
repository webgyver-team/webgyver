/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReviewImg1 from '../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../assets/image/review3.jpg';

export default function Review() {
  return (
    <Main>
      <CardView />
      <CardView />
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

function CardView() {
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Card>
      <p>뜨거운 물이 나오지 않는 건에 대하여</p>
      <p>평점 3.5</p>
      <Slider {...slickSettings}>
        <ImgBox>
          <img src={ReviewImg1} alt="" />
        </ImgBox>
        <ImgBox>
          <img src={ReviewImg2} alt="" />
        </ImgBox>
        <ImgBox>
          <img src={ReviewImg3} alt="" />
        </ImgBox>
      </Slider>
      <p>
        물말고 불도 나오길래 수리상담 받아봤어요!! 다행히도 이제 물만 잘
        나옵니다!
      </p>
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 0 0 8px;

  p:first-child {
    font-size: 14px;
    font-weight: bold;
  }

  p:nth-child(2) {
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => props.theme.color.defaultBlue};
  }

  p:last-child {
    font-size: 14px;
  }

  .slick-list {
    marign-right: -8px;
  }

  .slick-slide {
    padding-right: 8px;
  }
`;

const ImgBox = styled.div`
  position: relative;
  // width: 100px;
  height: 120px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;
