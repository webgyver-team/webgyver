import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

import { useRecoilState, useRecoilValue } from 'recoil';
import { reservationDate, chosenReservation } from '../../../atom';

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
}) {
  const chosenDate = useRecoilValue(reservationDate);
  const [clickedButton, setClickedButton] = useState(null);
  const [reservation, setReservation] = useRecoilState(chosenReservation);
  useEffect(() => {
    if (clickedButton !== null) {
      clickedButton.style.backgroundColor = '#1976D2';
      clickedButton.style.color = '#ffffff';
    }
  }, [clickedButton]);
  const handleChosenReservation = (event) => {
    // event.target.setProperty('variant', 'contained');
    // 새로운 데이터 생성
    const data = {
      idx,
      storeName,
      date: chosenDate,
      time: event.target.innerText,
    };

    // 이미 Recoil의 chosenReservation의 내용과 다르면
    // Recoil의 chosenReservation 업데이트

    // 같으면
    // 1. chosenReservation 해제
    // 2. event 담긴 버튼의 variant outline으로 변경

    if (
      // eslint-disable-next-line operator-linebreak
      data.idx !== reservation.idx ||
      // eslint-disable-next-line operator-linebreak
      data.time !== reservation.time ||
      // eslint-disable-next-line operator-linebreak
      data.date.getFullYear() !== reservation.date.getFullYear() ||
      // eslint-disable-next-line operator-linebreak
      data.date.getMonth() !== reservation.date.getMonth() ||
      // eslint-disable-next-line operator-linebreak
      data.date.getDate() !== reservation.date.getDate()
    ) {
      //   alert('신규 등록해야 해!');
      if (clickedButton !== null) {
        clickedButton.style.backgroundColor = '#ffffff';
        clickedButton.style.color = '#1976D2';
      }
      setClickedButton(() => event.target);
      setReservation(data);
      return;
    }
    alert('일치하는거 또 눌렀네!');
    setReservation({
      idx: null,
      storeName: null,
      date: null,
      time: null,
    });
  };
  return (
    <div style={{ border: '1px solid blue' }}>
      <div style={{ display: 'flex' }}>
        <Picture src={picture} alt="" />
        <div>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {storeName}
          </span>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {personName}
          </span>
          <p style={{ fontSize: '16px' }}>
            {`${address} ${detailAddress}(${distance}km)`}
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="half-rating-read"
              value={star}
              precision={0.1}
              readOnly
            />
            <span style={{ fontSize: '16px' }}>{star}</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'inline-flex',
          width: '100vw',
          overflowX: 'scroll',
          paddingBottom: '12px',
        }}
      >
        {allTime.map((time) => {
          if (!noTime.includes(time)) {
            return (
              <Button
                variant="outlined"
                onClick={handleChosenReservation}
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
      </div>
      {/* <Button variant="outlined" key={time} style={{ margin: '0px 8px' }}>
        {time}
      </Button> */}
    </div>
  );
}

const Picture = styled.img`
  width: 96px;
  height: 96px;
`;
