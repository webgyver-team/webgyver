import React from 'react';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CheckIcon from '@mui/icons-material/Check';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

export default function Reserve() {
  const reservationInfo = [
    [
      '1. 내 위치 설정',
      '현재 위치 확인 후, 변경',
      <LocationOnIcon fontSize="large" />,
    ],
    [
      '2. 업체 / 시간 선택',
      '주변 업체를 둘러보고 결정',
      <CalendarMonthIcon fontSize="large" />,
    ],
    [
      '3. 문의 내용 등록',
      '고장 내용 및 사진 등록',
      <HistoryEduIcon fontSize="large" />,
    ],
    ['4. 예약 수락 대기', '5분이내 예약 확정', <CheckIcon fontSize="large" />],
    [
      '5. 화상 상담 진행',
      '화상 통화로 실시간 진단',
      <CoPresentIcon fontSize="large" />,
    ],
    [
      '6. 자동 결제 진행',
      '등록된 카드로 자동으로 결제',
      <PaymentIcon fontSize="large" />,
    ],
    [
      '7. 방문 수리 진행',
      '전문가가 직접 방문',
      <HomeRepairServiceIcon fontSize="large" />,
    ],
  ];
  return (
    <Main>
      <BtnBox>
        <div>
          <p>전문가를 살펴보고</p>
          <p>시간을 정할 수 있어요.</p>
        </div>
        <BtnPosition>
          <Btn>
            <span>예약상담</span>
            <ArrowForwardIcon fontSize="medium" />
          </Btn>
        </BtnPosition>
      </BtnBox>
      <InfoBox>
        <List>
          {reservationInfo.map((item) => (
            <ListItem key={item}>
              <Info>
                <InfoImgBox>{item[2]}</InfoImgBox>
                <InfoTextBox>
                  <span>{item[0]}</span>
                  <p>{item[1]}</p>
                </InfoTextBox>
              </Info>
            </ListItem>
          ))}
        </List>
      </InfoBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100;
  margin: 16px;
`;

const BtnBox = styled.div`
  height: 100;
  padding: 16px;
  margin-bottom: 32px;
  p {
    font-size: 20px;
    font-weight: bold;
  }
  p:last-child {
    padding-bottom: 32px;
  }
`;

const BtnPosition = styled.div`
  display: flex;
  justify-content: center;
`;

const Btn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => props.theme.color.defaultaccentColor};
  :hover {
    cursor: pointer;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
`;

const InfoBox = styled.div`
  border-radius: 20px;
  padding: 48px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  :last-child {
    margin-bottom: 0;
  }

  span {
    font-size: 24px;
    font-weight: bold;
  }
`;

const InfoImgBox = styled.div`
  display: inline-block;
  margin-right: 16px;
`;

const InfoTextBox = styled.div`
  display: inline-block;
`;
