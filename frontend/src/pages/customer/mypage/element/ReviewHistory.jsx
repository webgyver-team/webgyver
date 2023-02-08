/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useRecoilValue } from 'recoil';
import { customer } from '../../../../api/customerService';
import { userIdx } from '../../../../atom';

export default function ReviewHistory() {
  const customerIdx = useRecoilValue(userIdx);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getMyReview = async () => {
      const response = await customer.get.myReview(customerIdx);

      if (response.statusCode === 200) {
        setReviews(response.data.reviews);
      } else {
        // eslint-disable-next-line
        alert(response.message);
      }
    };
    getMyReview();
  }, [customerIdx]);
  // const [reviews] = useState([
  //   {
  //     title: '뜨거운 물이 나오지 않는 건에 대하여',
  //     content:
  // '물말고 불도 나오길래 수리상담 받아봤어요!! 다행히도 이제 물만 잘 나옵니다! 물말고 불도 나오길래 수리상담 받아봤어요!! 다행히도 이제 물만 잘 나옵니다!',
  //     date: '01월 28일 09:00',
  //     images: [ReviewImg1, ReviewImg2, ReviewImg3],
  //     score: 3.0,
  //   },
  // ]);

  return (
    <Main>
      {reviews.map((review) => (
        <CardView key={review.reviewIdx} review={review} />
      ))}
      {reviews.length === 0 ? (
        <NoReviewMessage>리뷰 내역이 없습니다.</NoReviewMessage>
      ) : null}
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
      <p className="score">{`평점 : ${review.rating}`}</p>
      <Slider {...slickSettings}>
        {review.images.map((image) => (
          <ImgBox key={image.saveName}>
            <img src={image.saveName} alt="" />
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

const NoReviewMessage = styled.p`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 18px;
`;
