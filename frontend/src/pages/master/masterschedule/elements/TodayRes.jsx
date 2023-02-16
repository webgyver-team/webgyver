/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Proceeding({ today }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const noMore = today.content.length > 60;
  const [isShowMore, setIsShowMore] = useState(false);
  const shortComment = today.content.slice(0, 60);
  const onChangeShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  return (
    <Card>
      <ContentBox>
        {today.type === '5' && <VisitBox>방문일정</VisitBox>}
        <div>
          {!today.pictureList.length && <NoImgBox />}
          <SliderBox>
            <Slider {...slickSettings}>
              {today.pictureList.map((el) => (
                <ImgBox key={el}>
                  <img
                    src={`https://webgyver.s3.ap-northeast-2.amazonaws.com/${el.saveName}`}
                    alt=""
                  />
                </ImgBox>
              ))}
            </Slider>
          </SliderBox>
        </div>
        <div className="contentdiv">
          <p className="title">{today.title}</p>
          <p className="date">
            {`일시: ${today.reservationTime.substr(0, 16)}`}
          </p>
          <span className="content">
            {isShowMore ? today.content : shortComment}
          </span>
          <MoreBtn type="button" onClick={onChangeShowMore}>
            {noMore && (isShowMore ? '[닫기]' : '[더보기]')}
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
  width: 70vw;

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
  position: relative;

  .contentdiv {
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

const NoImgBox = styled.div`
  width: 128px;
  height: 120px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  margin: 0 4px 8px 4px;
`;

const VisitBox = styled.div`
  position: absolute;
  top: -4px;
  right: 0;
  font-size: 14px;
  padding: 8px;
  color: ${(props) => props.theme.color.defaultBlue};
  border: 1px solid ${(props) => props.theme.color.defaultBlue};
  border-radius: 5px;
`;
