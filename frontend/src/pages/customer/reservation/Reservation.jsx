import React from 'react';
// eslint-disable-next-line import/no-unresolved
import DatePicker from 'react-horizontal-datepicker';

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
      <div style={{ border: '2px solid black' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>날짜 선택</h2>
        <div
          style={{
            width: '380px',
            overflowX: 'scroll',
          }}
        >
          <DatePicker
            getSelectedDay={selectedDay}
            labelFormat="MMMM"
            color="#1976D2"
            style={{ border: '1px solid black' }}
          />
          <DatePicker
            getSelectedDay={selectedDay}
            endDate={31}
            selectDate={today}
            labelFormat="yy년 M월"
            color="#1976D2"
            marked={[
              {
                date: today,
                marked: true,
                style: {
                  color: '#ff0000',
                  padding: '2px',
                  fontSize: 12,
                },
                text: '1x',
              },
              {
                date: new Date(2023, 0, 26),
                marked: true,
                style: {
                  color: 'black',
                  padding: '2px',
                  fontSize: 12,
                },
                text: '5x',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
