import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import ReserveInfo from '../../../../assets/image/ReserveInfo.png';
import { locateModalState } from '../../../../atom';

export default function Direct() {
  const navigate = useNavigate();
  const setLocateOpenState = useSetRecoilState(locateModalState);
  const openLocateModal = () => setLocateOpenState(true);
  const routeReservation = () => {
    openLocateModal();
    navigate('/reservation');
  };
  return (
    <Main>
      <BtnBox>
        <div>
          <p>전문가를 살펴보고</p>
          <p>시간을 정할 수 있어요</p>
        </div>
        <BtnPosition>
          <Btn onClick={routeReservation}>
            <span>예약상담</span>
            <ArrowForwardIcon fontSize="medium" />
          </Btn>
        </BtnPosition>
      </BtnBox>
      <DividerBox />
      <InfoBox>
        <img src={ReserveInfo} alt="바로상담가이드" width="320px" />
      </InfoBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100;
`;

const BtnBox = styled.div`
  height: 100;
  padding: 16px;
  margin: 16px 16px 32px 16px;
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

const DividerBox = styled.div`
  height: 8px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
  box-shadow: inset 0px 2px 2px 0px
    ${(props) => props.theme.color.dafaultBorder};
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 20px;
  padding: 40px;
`;
