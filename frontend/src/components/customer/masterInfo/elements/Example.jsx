/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WhiteImg from '../../../../assets/image/white.png';

export default function Example(props) {
  const [data, setData] = useState(props);
  useLayoutEffect(() => {
    setData(props);
  }, [props]);
  return (
    <Main>
      {/* eslint-disable-next-line */}
      {data.props && data.props.historyList.length === 0 ? (
        <NoExample>등록된 수리사례가 없습니다.</NoExample>
      ) : null}
      {/* eslint-disable-next-line */}
      {data.props &&
        data.props.historyList.map((history) => (
          <CardView key={history.articleIdx} history={history} />
        ))}
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

function CardView({ history }) {
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
        {history && history.images.length === 0 ? (
          <ImgBox>
            <img src={WhiteImg} alt="default" />
          </ImgBox>
        ) : (
          history.images.map((image) => (
            // eslint-disable-next-line
            <ImgBox key={image.saveName}>
              <img
                src={`https://webgyver.s3.ap-northeast-2.amazonaws.com/${image.saveName}`}
                alt={image.originName}
              />
            </ImgBox>
            // eslint-disable-next-line
          ))
        )}
      </Slider>
      <p>{history && history.content}</p>
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

const NoExample = styled.p`
  font-size: 18px;
  font-weight: bold;
  // border: 1px solid black;
  text-align: center;
  margin-top: 30vh;
`;
