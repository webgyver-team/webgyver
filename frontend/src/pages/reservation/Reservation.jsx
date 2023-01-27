import React, { useState, useEffect } from 'react';
import DatePicker from 'react-horizontal-datepicker';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '@mui/material/Button';
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
    {
      idx: 5,
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
      idx: 6,
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
  const selectedDay = (val) => {
    // 선택한 날짜가 오늘 이라면 현재 시간을 반영해라..
    const now = new Date();
    if (
      // eslint-disable-next-line
      val.getFullYear !== now.getFullYear ||
      // eslint-disable-next-line
      val.getMonth() !== now.getMonth() ||
      val.getDate() !== now.getDate()
    ) {
      setDate(val);
    } else setDate(now);
  };
  // 디폴트로 요일이 영어로 되어 있는 것을 한글로 바꿔주기 위함
  const dayToKorean = () => {
    const dayList = ['일', '월', '화', '수', '목', '금', '토'];
    let idx = 0;
    const days = document.querySelectorAll('#container div div div div');
    switch (days[0].innerText) {
      case 'Mon':
      case '월':
        idx = 1;
        break;
      case 'Tue':
      case '화':
        idx = 2;
        break;
      case 'Wed':
      case '수':
        idx = 3;
        break;
      case 'Thu':
      case '목':
        idx = 4;
        break;
      case 'Fri':
      case '금':
        idx = 5;
        break;
      case 'Sat':
      case '토':
        idx = 6;
        break;
      case 'Sun':
      case '일':
        idx = 0;
        break;
      default:
        break;
    }
    for (let i = 0; i < days.length; i += 2) {
      days[i].innerText = dayList[idx];
      idx = (idx + 1) % 7;
    }
  };
  useEffect(() => dayToKorean, []);

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
          <DatePicker
            getSelectedDay={selectedDay}
            endDate={31}
            locale="ko"
            selectDate={date}
            color="#000000"
            labelFormat="yy년 M월"
          />
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
        {
          reservationButton ? (
            <Button
              variant="contained"
              style={{ position: 'fixed', bottom: '50px' }}
            >
              상담 예약하기
            </Button>
          ) : null
          // <Button
          //   variant="contained"
          //   disabled
          //   style={{ position: 'fixed', bottom: '50px' }}
          // >
          //   상담 예약하기
          // </Button>
        }
      </div>
    </div>
  );
}
// 선택 감지 못하고 있음
const CustomDatePickerDiv = styled.div`
  max-width: 100vw;
  padding: 8px;
  overflow-x: scroll;
  font-size: 24px;
  line-height: 70%;
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
