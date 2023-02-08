/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { customer } from '../../../../api/customerService';
import { userIdx, reviewToEdit } from '../../../../atom';

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
  const navigate = useNavigate();
  const setReviewToEdit = useSetRecoilState(reviewToEdit);
  const deleteReview = () => {
    // eslint-disable-next-line
    if (confirm('리뷰를 삭제하시겠습니까?')) {
      console.log(`${review.reviewIdx}번째 리뷰 삭제 DELETE 요청`);
    }
  };
  const editReview = (r) => {
    setReviewToEdit(r);
    navigate('/reviewForm');
  };
  return (
    <Card>
      <TitleBox>
        <p className="title">{review.title}</p>
        <div
          style={{
            width: '60px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <EditIcon onClick={() => editReview(review)} />
          <DeleteIcon onClick={deleteReview} />
        </div>
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
