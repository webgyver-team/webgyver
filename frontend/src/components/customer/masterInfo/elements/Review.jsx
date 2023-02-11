/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import ReviewImg1 from '../../../../assets/image/review1.jpg';
// import ReviewImg2 from '../../../../assets/image/review2.jpg';
// import ReviewImg3 from '../../../../assets/image/review3.jpg';

export default function Review(props) {
  const [data, setData] = useState(props);
  useLayoutEffect(() => {
    setData(props);
  }, [props]);
  // const [reviews] = useState([
  //   {
  //     title: '뜨거운 물이 나오지 않는 건에 대하여',
  //     content:
  //       '물말고 불도 나오길래 수리상담 받아봤어요!! 다행히도 이제 물만 잘 나옵니다!',
  //     date: '01월 28일 09:00',
  //     images: [ReviewImg1, ReviewImg2, ReviewImg3],
  //     score: 3.0,
  //   },
  // ]);

  return (
    <Main>
      {/* eslint-disable-next-line */}
      {data.props && data.props.length === 0 ? (
        <NoExample>등록된 후기가 없습니다.</NoExample>
      ) : null}
      {/* eslint-disable-next-line */}
      {data.props &&
        data.props.map((review) => (
          <CardView key={review?.reviewIdx} review={review} />
        ))}
      {/* <CardView review={reviews[0]} /> */}
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

function CardView({ review }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Card>
      <p className="title">{review.title}</p>
      <p className="score">{`평점 : ${review.rating}`}</p>
      <Slider {...slickSettings}>
        {review.images.map((image) => (
          <ImgBox key={image.saveName}>
            <img
              src={`https://webgyver.s3.ap-northeast-2.amazonaws.com/${image.saveName}`}
              alt={image.originName}
            />
          </ImgBox>
        ))}
      </Slider>
      <p className="content">{review.content}</p>
      {review.comment !== null && (
        <CommentBox>
          <p>{review.comment.commentContent}</p>
        </CommentBox>
      )}
      <EndBar />
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 0 0 8px;

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

const ImgBox = styled.div`
  position: relative;
  // width: 100px;
  height: 140px;
  margin-bottom: 8px;

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

const NoExample = styled.p`
  font-size: 18px;
  font-weight: bold;
  // border: 1px solid black;
  text-align: center;
  margin-top: 30vh;
`;

const CommentBox = styled.div`
  padding: 16px;
  margin: 16px 8px 16px 8px;
  border-radius: 10px;
  font-size: 14px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;

const EndBar = styled.div`
  margin: 24px 0 16px 0;
  height: 0px;
  border-bottom: 1px solid ${(props) => props.theme.color.dafaultBorder};
`;
