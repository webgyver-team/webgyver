import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function DatePicker({ handleDate }) {
  const today = new Date();
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  const [clickedDate, setClickedDate] = useState(null);
  const getList = () => {
    const array = [];
    // array.push(today);
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
  const dateList = getList();
  const dateDivCnt = dateList.length; // 띄워진 날짜의 개수
  const [itemsLeft, setItemsLeft] = useState((48 * dateDivCnt) / 2 + 40);
  const moveItemsLeft = () => {
    // console.log(`${itemsLeft}를 ${itemsLeft + (window.outerWidth - 80)}으로..`);
    if (itemsLeft + (window.outerWidth - 80) > (48 * dateDivCnt) / 2 + 40) {
      setItemsLeft((48 * dateDivCnt) / 2 + 40);
      return;
    }
    setItemsLeft(() => itemsLeft + (window.outerWidth - 80));
  };
  const moveItemsRight = () => {
    // 오른쪽을 눌렀으면...
    // 현재 화면에 보여지는 만큼의 너비만큼 더해줘야 함
    // console.log(`${itemsLeft}를 ${itemsLeft - (window.outerWidth - 80)}으로..`);
    // 필요 이상으로 줄어들면 마지막꺼 보여질 정도로만..
    if (itemsLeft - (window.outerWidth - 80) < -32) {
      setItemsLeft(-32);
      return;
    }
    setItemsLeft(() => itemsLeft - (window.outerWidth - 80));
  };
  useEffect(() => {
    if (clickedDate === null) {
      setClickedDate(document.querySelector('.items div'));
    }
    if (clickedDate !== null) {
      clickedDate.style.border = '2px solid #1976D2';
    }
  }, [clickedDate]);
  const handleClickedDate = (element) => {
    setClickedDate(element);
  };
  const chooseDate = (event, date) => {
    // 클릭한 요소의 border 부여
    if (clickedDate === event.currentTarget) {
      return;
    }
    if (clickedDate !== null) {
      // 기존 요소 해제
      clickedDate.style.border = '0px';
    }
    handleClickedDate(event.currentTarget);
    // 해당 날짜를 부모의 setDate로 설정
    // 바뀌었다면? timeButton 해제 시켜야 함...
    handleDate(date);
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
      <ButtonOverlay
        id="left"
        className="button-overlay left"
        onClick={moveItemsLeft}
        style={{ left: '0' }}
      >
        &#9664;
      </ButtonOverlay>
      <ButtonOverlay
        id="right"
        className="button-overlay right"
        onClick={moveItemsRight}
        style={{ right: '0' }}
      >
        &#9654;
      </ButtonOverlay>
    </FlexContainer>
  );
}

const FlexContainer = styled.div`
  display: flex;
  width: 92vw;
  overflow-x: scroll;
`;
const Items = styled.div`
  display: inline-flex;
  align-items: center;
  padding-bottom: 12px;
  //   padding: 0 4vw;
  //   left: ${(props) => props.itemsLeft}px; // (widht+margin)px * 개수
  //   transform: translateY(-50%) translateX(-50%);
  transition: left 0.5s;
  transition-timing-function: ease-in-out;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  margin: 0px 4px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  //   transition: 0.3s;
  //   transition-timing-function: ease-in-out;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonOverlay = styled.div`
  z-index: 1;
  position: absolute;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  //   background-color: rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.color.defaultBlue};
  color: #fff;
  font-size: 16px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
