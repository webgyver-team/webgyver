/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { master } from '../../../../api/masterService';

export default function Waiting({ waiting, setReload }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [isShowMore, setIsShowMore] = useState(false);
  const shortComment = waiting.content.slice(0, 60);
  const noMore = waiting.content.length > 60;
  const onChangeShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const currentState = ['수락하기', '거절하기'];

  const acceptRes = async () => {
    const { reservationIdx } = waiting;
    const response = await master.put.schedule(reservationIdx, true);
    if (response.statusCode === 200) {
      // eslint-disable-next-line
      alert('예약되었습니다.');
      // setFormContent('');
      setReload(true);
    } else if (response.statusCode === 204) {
      // eslint-disable-next-line
      console.log(response);
      // eslint-disable-next-line no-alert
      alert('결제에 실패하였습니다.');
    } else {
      // eslint-disable-next-line
      console.log(response);
      // eslint-disable-next-line no-alert
      alert('예약에 실패했습니다.');
      // eslint-disable-next-line no-alert
      alert(response);
    }
  };

  const rejectRes = async () => {
    const { reservationIdx } = waiting;
    const response = await master.put.schedule(reservationIdx, false);
    if (response.statusCode === 200) {
      // eslint-disable-next-line
      alert('거절되었습니다.');
      // setFormContent('');
      setReload(true);
    } else {
      // eslint-disable-next-line
      console.log(response);
      // eslint-disable-next-line no-alert
      alert(response);
    }
  };

  return (
    <Card>
      <ContentBox>
        <div>
          {!waiting.pictureList.length && <NoImgBox />}
          <SliderBox>
            <Slider {...slickSettings}>
              {waiting.pictureList.map((el) => (
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
          <p className="title">{waiting.title}</p>
          <p className="date">
            {`일시: ${waiting.reservationTime.substr(0, 16)}`}
          </p>
          <p className="price">{`가격: ${waiting.price}`}</p>
          <span className="content">
            {isShowMore ? waiting.content : shortComment}
          </span>
          <MoreBtn type="button" onClick={onChangeShowMore}>
            {noMore && (isShowMore ? '[닫기]' : '[더보기]')}
          </MoreBtn>
        </div>
      </ContentBox>
      <BtnBox>
        <StateBtn onClick={acceptRes}>
          <span>{currentState[0]}</span>
        </StateBtn>
        <StateBtn onClick={rejectRes}>
          <span>{currentState[1]}</span>
        </StateBtn>
      </BtnBox>
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 12px 16px 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 5px;
  margin: 8px;
  display: flex;
  justify-content: space-between;
  width: 70vw;

  .title {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 4px;
  }

  .date {
    font-size: 12px;
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

const BtnBox = styled.div`
  margin-top: 4px;
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
  height: 56px;
  width: 120px;
  box-shadow: 1px 1px 4px 0px ${(props) => props.theme.color.dafaultBorder};
  background-color: ${(props) => props.theme.color.defaultRed};
  color: ${(props) => props.theme.color.defaultWhite};

  :first-child {
    margin-bottom: 8px;
    background-color: ${(props) => props.theme.color.defaultBlue};
  }

  :hover {
    cursor: pointer;
    // color: ${(props) => props.theme.color.defaultColor};
    // background-color: ${(props) => props.theme.color.dafaultBorder};
  }
`;

const NoImgBox = styled.div`
  width: 128px;
  height: 120px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  margin: 0 4px 8px 4px;
`;
