import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '@mui/material/Button';
import DatePicker from './elements/DatePicker';
import LocateModal from '../../components/sitepopup/LocateModal';
import {
  locateValueState,
  reservationDate,
  chosenReservation,
} from '../../atom';
import StoreInfo from './elements/StoreInfo';

export default function Reservation() {
  const [date, setDate] = useRecoilState(reservationDate);
  const [reservation, setReservation] = useRecoilState(chosenReservation);
  const [clickedTimeButton, setClickedTimeButton] = useState(null);
  const [reservationButton, setReservationButton] = useState(false);
  const handleDate = (value) => {
    if (date !== value) {
      // 이전과 다른날짜를 선택했을 때 예약 클릭 정보 초기화
      if (clickedTimeButton !== null) {
        clickedTimeButton.style.backgroundColor = '#ffffff';
        clickedTimeButton.style.color = '#1976D2';
      }
      setClickedTimeButton(null);
      if (reservation !== null) {
        setReservation({
          idx: null,
          storeName: null,
          date: null,
          time: null,
        });
      }
    }
    setDate(value);
  };
  const handleClickedTimeButton = (event, selected) => {
    // 새로운 데이터 생성
    const data = { ...selected, date };
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
      if (clickedTimeButton !== null) {
        clickedTimeButton.style.backgroundColor = '#ffffff';
        clickedTimeButton.style.color = '#1976D2';
      }
      setClickedTimeButton(() => event.target);
      setReservation(data);
      setDate(date);
      return;
    }
    // alert('일치하는거 또 눌렀네!');
    clickedTimeButton.style.backgroundColor = '#ffffff';
    clickedTimeButton.style.color = '#1976D2';
    setClickedTimeButton(null);
    setReservation({
      idx: null,
      storeName: null,
      date: null,
      time: null,
    });
  };
  useEffect(() => {
    if (clickedTimeButton !== null) {
      clickedTimeButton.style.backgroundColor = '#1976D2';
      clickedTimeButton.style.color = '#ffffff';
    }
  }, [clickedTimeButton]);
  useEffect(() => {
    if (clickedTimeButton === null) {
      setReservationButton(false);
    } else {
      setReservationButton(true);
    }
  }, [clickedTimeButton]);
  const location = useRecoilValue(locateValueState);
  const storeList = [
    {
      idx: 1,
      storeName: '박복자가게',
      personName: '박복자',
      address: '대전 서구 청사로 253',
      detailAddress: '111동 2222호',
      distance: 12.4,
      star: 4.7,
      picture: 'asdf/asdf/asdf.png',
      allTime: [
        '09:00',
        '09:15',
        '09:30',
        '09:45',
        '10:00',
        '10:15',
        '10:30',
        '10:45',
        '11:00',
        '11:15',
        '11:30',
        '11:45',
        '12:00',
        '12:15',
        '12:30',
        '12:45',
      ],
      noTime: ['09:15', '10:15', '09:30'],
    },
    {
      idx: 2,
      storeName: '김순자가게',
      personName: '김순자',
      address: '대전 서구 청사로 253',
      detailAddress: '111동 2222호',
      distance: 312.4,
      star: 1.2,
      picture: 'asdf/asdf/sfnias.png',
      allTime: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15'],
      noTime: ['12:15', '10:15', '09:15'],
    },
    {
      idx: 3,
      storeName: '박복자가게',
      personName: '박복자',
      address: '대전 서구 청사로 253',
      detailAddress: '111동 2222호',
      distance: 12.4,
      star: 4.7,
      picture: 'asdf/asdf/asdf.png',
      allTime: [
        '09:00',
        '09:15',
        '09:30',
        '09:45',
        '10:00',
        '10:15',
        '10:30',
        '10:45',
        '11:00',
        '11:15',
        '11:30',
        '11:45',
        '12:00',
        '12:15',
        '12:30',
        '12:45',
      ],
      noTime: ['09:15', '10:15', '09:30'],
    },
    {
      idx: 4,
      storeName: '김순자가게',
      personName: '김순자',
      address: '대전 서구 청사로 253',
      detailAddress: '111동 2222호',
      distance: 312.4,
      star: 1.2,
      picture: 'asdf/asdf/sfnias.png',
      allTime: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15'],
      noTime: ['12:15', '10:15', '09:15'],
    },
  ];

  return (
    <div>
      <DateDiv>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          날짜 선택
          {` [ ${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} (${date.getDay()})] `}
        </h2>
        <CustomDatePickerDiv>
          <DatePicker handleDate={handleDate} />
        </CustomDatePickerDiv>
      </DateDiv>
      <LocateDiv>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          <p>{location.address}</p>
          <p>{location.detail}</p>
        </div>
        <LocateModal />
      </LocateDiv>
      <div>
        {storeList.map((store) => (
          <StoreInfo
            key={store.idx}
            idx={store.idx}
            storeName={store.storeName}
            personName={store.personName}
            address={store.address}
            detailAddress={store.detailAddress}
            distance={store.distance}
            star={store.star}
            picture={store.picture}
            allTime={store.allTime}
            noTime={store.noTime}
            handleClickedTimeButton={handleClickedTimeButton}
          />
        ))}
      </div>
      <div style={{ border: '1px solid red', fontSize: '8px' }}>
        {`${reservation.idx}/${reservation.storeName}/`}
        {reservation.date !== null
          ? `${reservation.date.getFullYear()} ${reservation.date.getMonth()}`
          : null}
        {`/${reservation.time}`}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {reservationButton ? (
          <Button
            variant="contained"
            style={{ position: 'fixed', bottom: '50px' }}
          >
            상담 예약하기
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled
            style={{ position: 'fixed', bottom: '50px' }}
          >
            상담 예약하기
          </Button>
        )}
      </div>
    </div>
  );
}

const CustomDatePickerDiv = styled.div`
  // padding: 8px;
  font-size: 24px;
  overflow-x: visible;
  height: 40px;
  // border: 3px solid red;
`;

const DateDiv = styled.div`
  border-bottom: 1px solid black;
  padding: 4%;
`;

const LocateDiv = styled.div`
  border-bottom: 1px solid black;
  padding: 4%;
  display: flex;
  justify-content: space-between;
`;
