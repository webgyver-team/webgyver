import React from 'react';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectInfo from '../../../../assets/image/DirectInfo.png';

export default function Direct() {
  return (
    <Main>
      <BtnBox>
        <div>
          <p>지금 상담 가능한</p>
          <p>전문가와 연결해</p>
        </div>
        <BtnPosition>
          <Btn>
            <span>예약상담</span>
            <ArrowForwardIcon fontSize="medium" />
          </Btn>
        </BtnPosition>
      </BtnBox>
      <DividerBox />
      <InfoBox>
        <img src={DirectInfo} alt="바로상담가이드" width="320px" />
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
  padding: 48px;
`;
