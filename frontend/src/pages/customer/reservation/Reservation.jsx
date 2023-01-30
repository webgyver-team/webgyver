import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '@mui/material/Button';
import DatePicker from './elements/DatePicker';
import LocateModal from '../../../components/common/sitepopup/LocateModal';
import {
  locateValueState,
  reservationDate,
  chosenReservation,
} from '../../../atom';
import StoreInfo from './elements/StoreInfo';
import { storeList } from './dummyData';

export default function Reservation() {
  const [date, setDate] = useRecoilState(reservationDate); // 예약할 날짜(Date 형식)
  const [reservation, setReservation] = useRecoilState(chosenReservation);
  // 예약 정보 {idx, storeName, date, time}
  const [clickedTimeButton, setClickedTimeButton] = useState(null); // 클릭한 시간 버튼(HTML Element)
  const [reservationButton, setReservationButton] = useState(false); // 예약하기 버튼 on off(boolean)
  const reservationNull = {
    idx: null,
    storeName: null,
    date: null,
    time: null,
  };

  // 날짜 선택했을 때 실행되는 함수
  const handleDate = (value) => {
    if (date !== value) {
      // 이전과 다른날짜를 선택했을 때
      if (clickedTimeButton !== null) {
        // 이전에 클릭한 시간 버튼이 있다면
        // 이전 시간 버튼의 클릭 CSS 효과 해제
        clickedTimeButton.style.backgroundColor = '#ffffff';
        clickedTimeButton.style.color = '#1976D2';
      }
      setClickedTimeButton(null); // 클릭 시간 버튼 초기화
      if (reservation !== null) {
        // 등록한 예약 정보가 있었다면
        // 날짜가 바뀌면 제어가 불가능하기 때문에
        setReservation(reservationNull); // 예약 정보 null로 초기화
      }
    }
    setDate(value); // 선택한 날짜를 저장
  };

  // 시간 선택했을 때 실행되는 함수(event: 클릭한 HTML 요소, selected: date가 null인 reservation)
  const handleClickedTimeButton = (event, selected) => {
    // 새로운 reservation 생성
    const data = { ...selected, date }; // date만 갱신
    if (
      // reservation의 property와 하나라도 다르다면(다른 버튼 클릭)
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
      if (clickedTimeButton !== null) {
        // 기존 클릭 시간 버튼의 CSS 효과 제거
        clickedTimeButton.style.backgroundColor = '#ffffff';
        clickedTimeButton.style.color = '#1976D2';
      }
      setClickedTimeButton(() => event.target); // 클릭한 시간 버튼을 저장
      setReservation(data); // data를 reservation으로 저장
      return;
    }
    // data와 reservation이 같으면 같은 버튼 클릭한 것이므로 클릭 해제 해야 함
    // 클릭 시간 버튼의 클릭 CSS 효과 제거
    clickedTimeButton.style.backgroundColor = '#ffffff';
    clickedTimeButton.style.color = '#1976D2';
    setClickedTimeButton(null); // 클릭 시간 버튼 null로 초기화
    setReservation(reservationNull);
  };

  // 예약상담 등록폼으로 이동하는 함수(reservation 그대로 이용)
  const goReservationRegistForm = () => {
    // eslint-disable-next-line
    alert(
      `${reservation.idx}/${
        reservation.storeName
      }\n${reservation.date.getFullYear()}년 ${
        reservation.date.getMonth() + 1
      }월 ${reservation.date.getDate()}일\n${
        reservation.time
      }에 예약하시겠습니까?`,
    );
  };
  useEffect(() => {
    // 새로 바뀐 클릭 시간 버튼에 대해..
    if (clickedTimeButton !== null) {
      // null이 아니면
      // 클릭 CSS 효과 적용
      clickedTimeButton.style.backgroundColor = '#1976D2';
      clickedTimeButton.style.color = '#ffffff';
      setReservationButton(true); // 상담 예약하기 버튼 on
    } else setReservationButton(false); // 상담 예약하기 버튼 off
  }, [clickedTimeButton]);

  const location = useRecoilValue(locateValueState); // 주소 정보
  useEffect(() => {
    // 주소 또는 선택 날짜가 바뀌었으면
    // storeList 갱신해야 함
    // eslint-disable-next-line
    console.log('[가게 정보] axios 호출 필요');
  }, [location, date]);

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
            onClick={goReservationRegistForm}
          >
            상담 예약하기
          </Button>
        ) : null}
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
