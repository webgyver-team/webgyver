import React, { useEffect } from 'react';
import DatePicker from 'react-horizontal-datepicker';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import LocateModal from '../../components/sitepopup/LocateModal';
import { locateValueState, reservationDate } from '../../atom';

export default function Reservation() {
  const [date, setDate] = useRecoilState(reservationDate);
  const reservatedDate = useRecoilValue(reservationDate);
  const location = useRecoilValue(locateValueState);
  const selectedDay = (val) => {
    setDate(val);
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
          {` [ ${reservatedDate.getFullYear()}-${
            reservatedDate.getMonth() + 1
          }-${reservatedDate.getDate()} (${reservatedDate.getDay()})] `}
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
