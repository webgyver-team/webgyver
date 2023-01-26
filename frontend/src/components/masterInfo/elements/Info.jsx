import React from 'react';
import styled from 'styled-components';
import LimHS from '../../../assets/image/LimHS.png';
import Background from '../../../assets/image/MasterBackground.jpg';

export default function Info() {
  return (
    <Main>
      <MasterInfoBox>
        <MasterImgBox>
          <img src={LimHS} alt="마스터얼굴" />
        </MasterImgBox>
        <InfoBox>
          <InfoTextBox>
            <p>수리SsaF고수Shop</p>
            <p>임희상</p>
            <p>대전 유성구 덕명동 124</p>
          </InfoTextBox>
        </InfoBox>
      </MasterInfoBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

const MasterInfoBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 80px 1fr;
  height: 152px;
  padding: 16px;
  background-image: url(${Background});
  background-size: cover;
`;

const MasterImgBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 70%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
`;

const InfoTextBox = styled.div`
  margin-left: 16px;
  font-size: 14px;

  p {
    font-weight: bold;

    :first-child {
      font-size: 18px;
    }
  }
`;
