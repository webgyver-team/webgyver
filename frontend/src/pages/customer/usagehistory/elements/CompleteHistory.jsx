/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { customer } from '../../../../api/customerService';
import { userIdx } from '../../../../atom';
import LoadingSpinner from '../../../common/LoadingSpinner';
import WhiteImage from '../../../../assets/image/white.png';

export default function CompleteHistory() {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const customerIdx = useRecoilValue(userIdx);

  useEffect(() => {
    const getHistory = async () => {
      const response = await customer.get.completeHistory(customerIdx);
      if (response.statusCode === 200) {
        setHistories(response.data.reservationList);
      } else {
        // eslint-disable-next-line no-alert
        alert(response.message);
      }
      setLoading(false);
    };
    getHistory();
  }, [customerIdx]);
  return (
    <Main>
      {loading ? (
        <LoadingSpinner height="600" />
      ) : (
        // eslint-disable-next-line
        <>
          {histories.length > 0 ? (
            histories.map((history) => (
              <CardView key={history.reservationIdx} history={history} />
            ))
          ) : (
            <NoHistoryMessage>완료 내역이 없습니다.</NoHistoryMessage>
          )}
        </>
      )}
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

function CardView({ history }) {
  console.log(history);
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [contentOverLimit] = useState(
    history.content !== null && history.content.length > 50,
  );
  const [isShowMore, setIsShowMore] = useState(false);
  const onChangeShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const currentType = ['', '예약상담', '바로상담', '방문예약'];
  const currentState = [
    '',
    '수락 대기중',
    '예약 확정',
    '예약 취소',
    '화상 상담하기',
    '상담 완료',
  ];
  const date = history.reservationTime.split(' ')[0].split('-');
  const time = history.reservationTime.split(' ')[1].split(':');
  return (
    <Card>
      <p className="title">{history.title}</p>
      <ContentBox>
        <div className="contentdiv">
          <p className="date">{`상담유형: ${currentType[history.type]}`}</p>
          <p className="date">{`일시: ${date[0]}년 ${date[1]}월 ${date[2]}일 ${time[0]}시 ${time[1]}분`}</p>
          <p className="company">{`업체: ${history.companyName}`}</p>
          <span className="content">
            {contentOverLimit && !isShowMore
              ? history.content.slice(0, 50)
              : history.content}
          </span>
          {contentOverLimit ? (
            <MoreBtn type="button" onClick={onChangeShowMore}>
              {isShowMore ? '[닫기]' : '[더보기]'}
            </MoreBtn>
          ) : null}
        </div>
        <div>
          <SliderBox>
            <Slider {...slickSettings}>
              {history.imageList.length === 0 ? (
                <ImgBox>
                  <NoImage src={WhiteImage} alt="" />
                </ImgBox>
              ) : null}
              {history.imageList.map((image) => (
                <ImgBox key={image}>
                  <img
                    src={`https://webgyver.s3.ap-northeast-2.amazonaws.com/${image.saveName}`}
                    alt=""
                  />
                </ImgBox>
              ))}
            </Slider>
          </SliderBox>
          <BtnBox>
            <StateBtn>
              <span>{currentState[history.state]}</span>
            </StateBtn>
          </BtnBox>
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
  justify-content: space-between;

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
const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8px;
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
  width: 126px;
  box-shadow: 1px 1px 4px 0px ${(props) => props.theme.color.dafaultBorder};
  background-color: ${(props) => props.theme.color.defaultBgColor};
`;
const NoHistoryMessage = styled.p`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 18px;
`;

const NoImage = styled.img`
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
`;
