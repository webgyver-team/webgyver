import React from 'react';
import DatePicker from 'react-horizontal-datepicker';
import styled from 'styled-components';

export default function Reservation() {
  //   const [dateList, setDateList] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay(); // 0: 일요일 ~ 6: 토요일
  console.log(`${year} ${month} ${date} ${day}`);
  const selectedDay = (val) => {
    console.log(val);
  };

  return (
    <div>
      <DateDiv>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>날짜 선택</h2>
        <CustomDatePickerDiv>
          <DatePicker
            getSelectedDay={selectedDay}
            endDate={31}
            selectDate={today}
            color="#000000"
            labelFormat="yy년 M월"
          />
        </CustomDatePickerDiv>
      </DateDiv>
    </div>
  );
}

const CustomDatePickerDiv = styled.div`
  max-width: 100vw;
  padding: 8px;
  overflow-x: scroll;
  font-size: 24px;
  line-height: 70%;
  //   border: 1px solid black;
`;

const DateDiv = styled.div`
  border: 1px solid black;
  padding: 4%;
`;
