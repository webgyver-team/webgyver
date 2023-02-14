/* eslint-disable operator-linebreak */
import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import {
  masterInfoModalState,
  masterInfoModalIdxState,
} from '../../../../atom';

export default function StoreInfo({
  idx,
  storeName,
  personName,
  address,
  detailAddress,
  distance,
  star,
  picture,
  price,
  allTime,
  noTime,
  handleClickedTimeButton,
  isToday,
}) {
  const setMasterInfoModal = useSetRecoilState(masterInfoModalState);
  const setMasterInfoModalIdx = useSetRecoilState(masterInfoModalIdxState);
  const openMasterInfoModal = () => {
    setMasterInfoModalIdx(idx);
    setMasterInfoModal(true);
  };
  const todayHour = new Date().getHours();
  const todayMinute = new Date().getMinutes();

  const chooseTimeButton = (event) => {
    const data = {
      idx,
      storeName,
      date: null,
      time: event.target.innerText,
    };
    handleClickedTimeButton(event, data);
  };

  const timePassed = (target) => {
    let targetHour = Number(target.split(':')[0]);
    let targetMinute = Number(target.split(':')[1]);
    if (targetMinute - 2 < 0) {
      targetMinute += 58;
      targetHour = (targetHour - 1) % 24;
    } else {
      targetMinute -= 2;
    } // 타겟 시간을 2분 전으로 재설정
    // 이미 지난 시간이면 return true;
    if (
      targetHour < todayHour ||
      (targetHour === todayHour && targetMinute < todayMinute)
    ) {
      return true;
    }
    return false;
  };

  // eslint-disable-next-line array-callback-return
  const leftTime = allTime.filter((el) => {
    // eslint-disable-next-line no-unused-expressions
    return !noTime.includes(el);
  });
  // 예약가능 마지막 시간 판단
  const endTime = leftTime.length > 0 ? leftTime.slice(-1)[0].split(':') : null;
  const isEnd =
    isToday && // 오늘이면서
    endTime !== null &&
    timePassed(`${endTime[0]}:${endTime[1]}`);

  return (
    <Main>
      <StoreBox onClick={openMasterInfoModal}>
        <PictureBox>
          <Picture
            src={`https://webgyver.s3.ap-northeast-2.amazonaws.com/${picture}`}
            alt=""
          />
        </PictureBox>
        <InfoBox>
          <StoreNameContent>{storeName}</StoreNameContent>
          <MasterNameContent>{personName}</MasterNameContent>
          <AddressContent>
            {`${address} ${detailAddress} (${(
              Math.round(distance * 100) / 100
            ).toLocaleString('ko-kr')}km)`}
          </AddressContent>
          <RatingPriceBox>
            <RatingBox>
              <Rating
                name="half-rating-read"
                value={star}
                precision={0.1}
                readOnly
              />
              <RatingContent>{Math.round(star * 100) / 100}</RatingContent>
            </RatingBox>
            {/* eslint-disable-next-line */}
            <PriceBox>
              {`상담가: ${Number(price).toLocaleString('ko-KR')}원`}
            </PriceBox>
          </RatingPriceBox>
        </InfoBox>
      </StoreBox>
      <TimeBox>
        {allTime.map((time) => {
          if (isToday && timePassed(time)) {
            return null;
          } // 현재 시간 보다 작으면 그냥 return null
          if (!noTime.includes(time)) {
            return (
              <Button
                variant="outlined"
                onClick={chooseTimeButton}
                key={time}
                style={{
                  margin: '0px 8px',
                  color: '#1976D2',
                  borderColor: '#1976D2',
                }}
              >
                {time}
              </Button>
            );
          }
          return (
            <Button
              variant="outlined"
              disabled
              key={time}
              style={{ margin: '0px 8px' }}
            >
              {time}
            </Button>
          );
        })}
        {isEnd && <NoTimeMessage>예약 가능한 시간이 없습니다.</NoTimeMessage>}
      </TimeBox>
    </Main>
  );
}

const Main = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.dafaultBorder};
  padding: 8px 0 8px 8px;
`;

const StoreBox = styled.div`
  display: flex;
  padding-right: 8px;
`;
const InfoBox = styled.div`
  width: 100%;
`;
const TimeBox = styled.div`
  display: inline-flex;
  width: 100%;
  overflow-x: scroll;
  padding-bottom: 12px;
`;
const PictureBox = styled.div`
  margin-right: 4px;
`;
const PriceBox = styled.div`
  font-size: 12px;
`;
const Picture = styled.img`
  height: 96px;
  width: 96px;
  object-fit: cover;
  padding: 4px;
`;
const StoreNameContent = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const MasterNameContent = styled.span`
  font-size: 12px;
  font-weight: bold;
  margin-left: 4px;
`;
const AddressContent = styled.p`
  font-size: 12px;
`;
const RatingPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RatingBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;
const RatingContent = styled.span`
  font-size: 12px;
`;
const NoTimeMessage = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin: 0px auto;
`;
