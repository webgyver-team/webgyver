/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Proceeding({ history }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [isShowMore, setIsShowMore] = useState(false);
  const shortComment = history.content.slice(0, 60);
  const onChangeShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  return (
    <Card>
      <ContentBox>
        <div>
          <SliderBox>
            <Slider {...slickSettings}>
              {history.images.map((el) => (
                <ImgBox key={el}>
                  <img src={el} alt="" />
                </ImgBox>
              ))}
            </Slider>
          </SliderBox>
        </div>
        <div className="contentdiv">
          <p className="title">{history.title}</p>
          <p className="date">{`일시: ${history.date}`}</p>
          <span className="content">
            {isShowMore ? history.content : shortComment}
          </span>
          <MoreBtn type="button" onClick={onChangeShowMore}>
            {isShowMore ? '[닫기]' : '[더보기]'}
          </MoreBtn>
        </div>
      </ContentBox>
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 12px 16px 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 5px;
  margin: 8px;

  .title {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 4px;
  }

  .date {
    font-size: 12px;
    padding-bottom: 4px;
  }

  .slick-list {
    marign-right: -8px;
  }

  .slick-slide {
    padding-right: 4px;
    padding-left: 4px;
  }
`;

const ImgBox = styled.div`
  position: relative;
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

const ContentBox = styled.div`
  width: 100%;
  display: flex;

  .contentdiv {
    min-width: 480px;
    max-width: 640px;
    margin-right: 8px;
    margin-left: 8px;
    line-height: 16px;
  }

  .content {
    font-size: 14px;
    overflow: hidden;
  }
`;

const SliderBox = styled.div`
  width: 136px;
`;

const MoreBtn = styled.button`
  font-size: 14px;
  border: 0;
  background-color: transparent;
  margin-left: 8px;

  :hover {
    cursor: pointer;
  }
`;
