/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReviewImg1 from '../../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../../assets/image/review3.jpg';

export default function CompleteHistory() {
  const [historys] = useState([
    {
      title: '뜨거운 물이 나오지 않는 건에 대하여',
      content:
        '수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!',
      date: '01월 28일 09:00',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
      company: '수리Ssap고수Shop',
    },
  ]);

  return (
    <Main>
      <CardView history={historys[0]} />
      <CardView history={historys[0]} />
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

function CardView({ history }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [isShowMore, setIsShowMore] = useState(false);
  const shortComment = history.content.slice(0, 50);
  const onChangeShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const currentState = ['예약상담', '바로상담', '방문예약'];

  return (
    <Card>
      <p className="title">{history.title}</p>
      <ContentBox>
        <div className="contentdiv">
          <p className="date">{`상담유형: ${currentState[1]}`}</p>
          <p className="date">{`일시: ${history.date}`}</p>
          <p className="company">{`업체: ${history.company}`}</p>
          <span className="content">
            {isShowMore ? history.content : shortComment}
          </span>
          <MoreBtn type="button" onClick={onChangeShowMore}>
            {isShowMore ? '[닫기]' : '[더보기]'}
          </MoreBtn>
        </div>
        <div>
          <SliderBox>
            <Slider {...slickSettings}>
              {history.images.map((el) => (
                <ImgBox>
                  <img src={el} alt="" />
                </ImgBox>
              ))}
            </Slider>
          </SliderBox>
        </div>
      </ContentBox>
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 12px 16px 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 5px;
  margin: 8px 8px 0 8px;

  .title {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 4px;
  }

  .date {
    font-size: 12px;
  }

  .company {
    font-size: 12px;
    padding-bottom: 8px;
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
    margin-right: 8px;
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
