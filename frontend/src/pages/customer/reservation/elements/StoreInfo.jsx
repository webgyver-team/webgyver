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
  // eslint-disable-next-line array-callback-return
  const leftTime = allTime.filter((el) => {
    // eslint-disable-next-line no-unused-expressions
    !noTime.includes(el);
  });
  // 예약가능 마지막 시간 판단
  const endTime = leftTime.length > 0 ? leftTime.slice(-1)[0].split(':') : null;
  const isEnd =
    endTime !== null &&
    isToday &&
    todayHour >= endTime[0] &&
    todayMinute > endTime[1];

  return (
    <Main>
      <div
        style={{
          display: 'flex',
          paddingRight: '8px',
        }}
        onClick={openMasterInfoModal}
      >
        <div style={{ marginRight: '4px' }}>
          <Picture src={picture} alt="" />
        </div>
        <div>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            {storeName}
          </span>
          <span
            style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}
          >
            {personName}
          </span>
          <p style={{ fontSize: '12px' }}>
            {`${address} ${detailAddress} (${
              Math.round(distance * 100) / 100
            }km)`}
          </p>
          <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}
          >
            <Rating
              name="half-rating-read"
              value={star}
              precision={0.1}
              readOnly
            />
            <span style={{ fontSize: '12px' }}>
              {Math.round(star * 100) / 100}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'inline-flex',
          width: '100%',
          overflowX: 'scroll',
          paddingBottom: '12px',
        }}
      >
        {allTime.map((time) => {
          if (
            // eslint-disable-next-line
            isToday &&
            // eslint-disable-next-line
            (Number(time.split(':')[0]) < todayHour ||
              // eslint-disable-next-line
              (Number(time.split(':')[0]) === todayHour &&
                Number(time.split(':')[1] < todayMinute)))
          ) {
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
        {isEnd && <span>더이상 예약 가능한 시간이 없습니다.</span>}
      </div>
    </Main>
  );
}

const Main = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.dafaultBorder};
  padding: 8px 0 8px 8px;
`;

const Picture = styled.img`
  height: 96px;
  width: 96px;
  object-fit: cover;
  padding: 4px;
`;
