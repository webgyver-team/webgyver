import React from 'react';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CheckIcon from '@mui/icons-material/Check';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

export default function Reserve() {
  return (
    <Main>
      <BtnBox>
        <div>
          <p>전문가를 살펴보고</p>
          <p>시간을 정할 수 있어요.</p>
        </div>
        <BtnPosition>
          <Btn>
            <span>예약상담 바로가기</span>
            <ArrowForwardIcon fontSize="medium" />
          </Btn>
        </BtnPosition>
      </BtnBox>
      <InfoBox>
        <Info>
          <InfoImgBox>
            <LocationOnIcon fontSize="large" />
          </InfoImgBox>
          <InfoTextBox>
            <span>1. 내 위치 설정</span>
            <p>현재 위치 확인 후, 변경</p>
          </InfoTextBox>
        </Info>
        <Info>
          <InfoImgBox>
            <CalendarMonthIcon fontSize="large" />
          </InfoImgBox>
          <InfoTextBox>
            <span>2. 업체 / 시간 선택</span>
            <p>주변 업체를 둘러보고 결정</p>
          </InfoTextBox>
        </Info>
        <Info>
          <InfoImgBox>
            <HistoryEduIcon fontSize="large" />
          </InfoImgBox>
          <InfoTextBox>
            <span>3. 문의 내용 등록</span>
            <p>고장 내용 및 사진 등록</p>
          </InfoTextBox>
        </Info>
        <Info>
          <InfoImgBox>
            <CheckIcon fontSize="large" />
          </InfoImgBox>
          <InfoTextBox>
            <span>4. 예약 수락 대기</span>
            <p>5분이내 예약 확정</p>
          </InfoTextBox>
        </Info>
        <Info>
          <InfoImgBox>
            <CoPresentIcon fontSize="large" />
          </InfoImgBox>
          <InfoTextBox>
            <span>5. 화상 상담 진행</span>
            <p>화상 통화로 실시간 진단</p>
          </InfoTextBox>
        </Info>
        <Info>
          <InfoImgBox>
            <PaymentIcon fontSize="large" />
          </InfoImgBox>
          <InfoTextBox>
            <span>6. 자동 결제 진행</span>
            <p>등록된 카드로 자동으로 결제</p>
          </InfoTextBox>
        </Info>
        <Info>
          <InfoImgBox>
            <HomeRepairServiceIcon fontSize="large" />
          </InfoImgBox>
          <InfoTextBox>
            <span>7. 방문 수리 진행</span>
            <p>전문가가 직접 방문</p>
          </InfoTextBox>
        </Info>
      </InfoBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100;
`;

const BtnBox = styled.div`
  height: 100;
  padding: 32px;
  margin-bottom: 32px;
  p {
    font-size: 18px;
    font-weight: bold;
  }
  p:last-child {
    padding-bottom: 16px;
  }
`;

const BtnPosition = styled.div`
  display: flex;
  justify-content: center;
`;

const Btn = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 64px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
`;

const InfoBox = styled.div`
  border: 1px solid black;
  border-radius: 20px 20px 0 0;
  padding: 48px;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

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
