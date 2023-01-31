import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function DatePicker({ handleDate }) {
  const today = new Date(); // dateList 시작 기준 = 오늘
  const dayList = ['일', '월', '화', '수', '목', '금', '토']; // Date.getDate() 값을 한글 요일로 반환하기 위함
  const [clickedDate, setClickedDate] = useState(null); // clickedDate: 선택한 날짜의 HTML Element
  useEffect(() => {
    if (clickedDate === null) {
      setClickedDate(document.querySelector('.items div')); // 처음에 clickedDate를 시작일 HTML Element로 넣어주기
    }
    if (clickedDate !== null) {
      clickedDate.style.border = '1px solid #1976D2';
      clickedDate.style.color = '#ffffff';
      clickedDate.style.backgroundColor = '#1976D2';
    } // clickedDate에 클릭 CSS 효과 부여
  }, [clickedDate]); // clickedDate 바뀔 때마다 실행
  const getList = () => {
    const array = [];
    while (array.length < 30) {
      let month = today.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let day = today.getDate();
      day = day < 10 ? `0${day}` : day;
      array.push(new Date(`${today.getFullYear()}-${month}-${day}`));
      today.setDate(today.getDate() + 1);
    }
    return array;
  };
  const dateList = getList(); // 시작 기준 30일 만큼 날짜 선택 범위

  const handleClickedDate = (element) => {
    setClickedDate(element); // 클릭한 HTML Element를 clickedDate로 설정
  };
  const chooseDate = (event, date) => {
    // 날짜 선택했을 때, [CSS + state setter + 부모 전달]하는 함수
    if (clickedDate === event.currentTarget) {
      // 만약 이전에 클릭한 날짜와 동일한 날짜 클릭했으면
      return; // 함수 종료
    }
    // 기존 clickedDate CSS 효과 해제
    clickedDate.style.border = '1px solid transparent';
    clickedDate.style.color = '#000000';
    clickedDate.style.backgroundColor = '#ffffff';
    // 클릭 날짜의 HTML Element를 clickedDate로 설정
    handleClickedDate(event.currentTarget);
    // 클릭한 날짜를 부모의 date로 설정하게끔 props 전달
    handleDate(
      `${date.getFullYear()}-${
        (date.getMonth() + 1).toString().length < 2
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${
        date.getDate().toString().length < 2
          ? `0${date.getDate()}`
          : date.getDate()
      }`,
    );
  };
  return (
    <FlexContainer className="flex-container">
      <Items className="items">
        {dateList.map((date) => (
          <DateDiv key={date} onClick={(event) => chooseDate(event, date)}>
            <div>{dayList[date.getDay()]}</div>
            <div>{`${date.getMonth() + 1}/${date.getDate()}`}</div>
          </DateDiv>
        ))}
      </Items>
    </FlexContainer>
  );
}

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  overflow-x: scroll;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  padding: 10px;
  margin: 0px 4px;
  color: #000000;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid transparent;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
