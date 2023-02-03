/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DatePicker from './elements/DatePicker';
import {
  locateValueState,
  reservationDate,
  chosenReservation,
  locateModalState,
  categoryState,
} from '../../../atom';
import StoreInfo from './elements/StoreInfo';
import { storeList } from './dummyData';

export default function Reservation() {
  // 위치설정 모달 on/off
  const setLocateModalOpen = useSetRecoilState(locateModalState);
  const categoryIdx = useRecoilValue(categoryState);
  const openLocateModal = () => setLocateModalOpen(true);
  // 예약 정보 {idx, storeName, date, time}
  const reservationNull = {
    idx: null,
    storeName: null,
    date: null,
    time: null,
  }; // 빈 예약 정보
  const [date, setDate] = useRecoilState(reservationDate); // 예약할 날짜(Date 형식)
  const [reservation, setReservation] = useRecoilState(chosenReservation); // 전역 예약 정보(등록 시 변경)
  const [clickedReservation, setClickedReservation] = useState(reservationNull); // 클릭한 예약 정보
  const [clickedTimeButton, setClickedTimeButton] = useState(null); // 클릭한 시간 버튼(HTML Element)
  const [reservationButton, setReservationButton] = useState(false); // 예약하기 버튼 on off(boolean)

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
        setClickedReservation(reservationNull); // 예약 정보 null로 초기화
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
      data.idx !== clickedReservation.idx ||
      // eslint-disable-next-line operator-linebreak
      data.time !== clickedReservation.time ||
      // eslint-disable-next-line operator-linebreak
      data.date !== clickedReservation.date
    ) {
      if (clickedTimeButton !== null) {
        // 기존 클릭 시간 버튼의 CSS 효과 제거
        clickedTimeButton.style.backgroundColor = '#ffffff';
        clickedTimeButton.style.color = '#1976D2';
      }
      setClickedTimeButton(() => event.target); // 클릭한 시간 버튼을 저장
      setClickedReservation(data); // data를 reservation으로 저장
      return;
    }
    // data와 reservation이 같으면 같은 버튼 클릭한 것이므로 클릭 해제 해야 함
    // 클릭 시간 버튼의 클릭 CSS 효과 제거
    clickedTimeButton.style.backgroundColor = '#ffffff';
    clickedTimeButton.style.color = '#1976D2';
    setClickedReservation(reservationNull);
    setClickedTimeButton(null); // 클릭 시간 버튼 null로 초기화
  };

  // 예약상담 등록폼으로 이동하는 함수(reservation 그대로 이용)
  const goReservationForm = () => {
    // eslint-disable-next-line
    setReservation(clickedReservation); //이때 로컬 스토리지에 저장
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
    const data = {
      categoryIdx,
      lat: location.latitude,
      lng: location.longitude,
      date: date.replaceAll('-', ''),
    };
    //   {
    //     "categoryIdx": 1,
    //     "lat": 41.40338,
    //     "lng": 2.17403,
    //     "date": "20230202"
    // }
    // eslint-disable-next-line
    console.log(`[${data}] axios 호출 필요`);
  }, [location, date, categoryIdx]);

  const [type, setType] = useState(1);

  return (
    <Main>
      <DateDiv>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '8px',
            marginBottom: '8px',
          }}
        >
          날짜 선택
          {` [ ${date.split('-')[0]}-${date.split('-')[1]}-${
            date.split('-')[2]
          } ] `}
        </h2>
        <CustomDatePickerDiv>
          <DatePicker handleDate={handleDate} />
        </CustomDatePickerDiv>
      </DateDiv>
      <LocateDiv onClick={openLocateModal}>
        <SiteBox>
          <span>현재 위치</span>
          <ChevronRightIcon />
        </SiteBox>
        <div style={{ fontSize: '16px' }}>
          <p>{`${location.address} ${location.detail}`}</p>
        </div>
      </LocateDiv>
      <FilterBox type={type}>
        <span onClick={() => setType(1)}>거리순</span>
        <VerticalBar />
        <span onClick={() => setType(3)}>평점순</span>
        <VerticalBar />
        <span onClick={() => setType(5)}>가격순</span>
      </FilterBox>
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
      <NullBox />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'sticky',
          left: '0',
          right: '0',
          bottom: '20px',
        }}
      >
        {reservationButton ? (
          <Link
            to="/reservation/form"
            style={{
              position: 'auto',
              bottom: '20px',
              textDecoration: 'none',
            }}
          >
            <Btn onClick={goReservationForm}>
              <span>상담 예약하기</span>
            </Btn>
          </Link>
        ) : (
          <Link
            style={{
              position: 'auto',
              bottom: '20px',
              textDecoration: 'none',
            }}
          >
            <DisabledBtn>
              <span>상담 예약하기</span>
            </DisabledBtn>
          </Link>
        )}
      </div>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: scroll;
  position: 'relative';
`;

const CustomDatePickerDiv = styled.div`
  // padding: 8px;
  font-size: 24px;
  overflow-x: visible;
  height: 40px;
  // border: 3px solid red;
  margin-bottom: 8px;
`;

const DateDiv = styled.div`
  padding: 8px;
  margin-bottom: 12px;
`;

const LocateDiv = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-bottom: 1px solid ${(props) => props.theme.color.dafaultBorder};
  padding: 16px 4% 16px 4%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SiteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 296px;
  height: 64px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => props.theme.color.defaultBlue};
  box-shadow: 2px 2px 4px 0px ${(props) => props.theme.color.defaultlightColor};
  :hover {
    cursor: pointer;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
`;

const DisabledBtn = styled(Btn)`
  background-color: ${(props) => props.theme.color.dafaultBorder};
  :hover {
    cursor: default;
  }
`;

const NullBox = styled.div`
  height: 40px;
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0 8px 16px;
  font-size: 16px;

  span {
    cursor: pointer;

    :nth-child(${(props) => props.type}) {
      font-weight: bold;
    }
  }
`;

const VerticalBar = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${(props) => props.theme.color.dafaultBorder};
  margin: 0 8px 0 8px;
`;
