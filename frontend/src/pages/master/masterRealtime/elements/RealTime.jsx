/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function RealTime({ data }) {
  const navigate = useNavigate();
  const routeVideoService = () => navigate('/master/videoservice');
  // 더보기 on/off
  const [isDetail, setIsDetail] = useState(false);
  const handleIsDetail = () => {
    setIsDetail(!isDetail);
  };

  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const currentState = ['수락'];

  return (
    <Card>
      <ContentBox>
        <div className="header">
          <div className="contentdiv">
            <p className="title">{data.title}</p>
            <p className="price">{`가격: ${data.price}`}</p>
          </div>
          <NullBox />
          <BtnBox>
            <StateBtn onClick={handleIsDetail}>
              <span>{isDetail ? '접기' : '자세히'}</span>
            </StateBtn>
          </BtnBox>
        </div>
        {isDetail && (
          <DetailBox>
            <div>
              <SliderBox>
                <Slider {...slickSettings}>
                  {data.images.map((el) => (
                    <ImgBox key={el}>
                      <img src={el} alt="" />
                    </ImgBox>
                  ))}
                </Slider>
              </SliderBox>
            </div>
            <div className="contentdiv">
              <span className="content">{data.content}</span>
            </div>
            <BtnBox>
              <AcceptBtn onClick={routeVideoService}>
                <span>{currentState[0]}</span>
              </AcceptBtn>
            </BtnBox>
          </DetailBox>
        )}
      </ContentBox>
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 12px 16px 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 5px;
  margin: 8px;
  width: 912px;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 4px;
  }

  .price {
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

const NullBox = styled.div`
  width: 100%;
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

const DetailBox = styled.div`
  display: flex;
  margin-top: 8px;
`;

const SliderBox = styled.div`
  width: 136px;
`;

const BtnBox = styled.div`
  width: auto;
  display: flex;
  flex-direction: column-reverse;
`;

const StateBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  padding: 0 16px 0 16px;
  height: 40px;
  width: 120px;
  box-shadow: 1px 1px 4px 0px ${(props) => props.theme.color.dafaultBorder};
  background-color: ${(props) => props.theme.color.defaultBgColor};

  :hover {
    cursor: pointer;
    // background-color: ${(props) => props.theme.color.dafaultBorder};
  }
`;

const AcceptBtn = styled(StateBtn)`
  color: ${(props) => props.theme.color.defaultWhite};
  background-color: ${(props) => props.theme.color.defaultBlue};
`;
