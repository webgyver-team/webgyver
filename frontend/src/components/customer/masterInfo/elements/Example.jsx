/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReviewImg1 from '../../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../../assets/image/review3.jpg';

export default function Example() {
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
        물이 아니라 불이 나오는 고객님이 계셨습니다. 다행스럽게도 큰일나기 전에,
        전화상담을 통해서 연결된 밸브를 제거하고 온수로 재연결하셨습니다.
      </p>
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 0 0 8px;

  p {
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
