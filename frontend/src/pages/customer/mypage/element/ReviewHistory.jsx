/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReviewImg1 from '../../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../../assets/image/review3.jpg';

export default function ReviewHistory() {
  const [reviews] = useState([
    {
      title: '뜨거운 물이 나오지 않는 건에 대하여',
      content:
        '물말고 불도 나오길래 수리상담 받아봤어요!! 다행히도 이제 물만 잘 나옵니다! 물말고 불도 나오길래 수리상담 받아봤어요!! 다행히도 이제 물만 잘 나옵니다!',
      date: '01월 28일 09:00',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
      score: 3.0,
    },
  ]);

  return (
    <Main>
      <CardView review={reviews[0]} />
      <CardView review={reviews[0]} />
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

export function CardView({ review }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Card>
      <TitleBox>
        <p className="title">{review.title}</p>
        <EditIcon />
      </TitleBox>
      <p className="score">{`평점 : ${review.score}`}</p>
      <Slider {...slickSettings}>
        {review.images.map((el) => (
          <ImgBox>
            <img src={el} alt="" />
          </ImgBox>
        ))}
      </Slider>
      <p className="content">{review.content}</p>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  padding: 16px;

  :last-child {
    border: 0;
  }

  .title {
    font-size: 14px;
    font-weight: bold;
  }

  .score {
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => props.theme.color.defaultBlue};
    padding-bottom: 8px;
  }

  .content {
    font-size: 14px;
    padding-right: 4px;
  }

  .slick-list {
    marign-right: -8px;
  }

  .slick-slide {
    padding-right: 8px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
