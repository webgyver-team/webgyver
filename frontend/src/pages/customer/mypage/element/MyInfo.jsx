import React from 'react';
import styled from 'styled-components';

export default function MyInfo() {
  return (
    <Main>
      <InfoBox>
        <div>
          <span className="first">이름</span>
          <span className="last">임희상</span>
        </div>
        <NullBox />
        <div>
          <span className="first">전화번호</span>
          <span className="last">010-1234-5678</span>
        </div>
        <NullBox />
        <div>
          <span className="first">생년월일</span>
          <span className="last">1111년 11월 11일</span>
        </div>
        <NullBox />
        <div>
          <span className="first">카드정보</span>
          <span className="last">1234-1234-XXXX-1234</span>
        </div>
      </InfoBox>
      <BtnBox>
        <Btn>수정하기</Btn>
      </BtnBox>
    </Main>
  );
}

const Main = styled.div`
  margin: 16px;
`;

const InfoBox = styled.div`
  font-size: 16px;
  padding: 16px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
  box-shadow: 2px 2px 4px 0px ${(props) => props.theme.color.dafaultBorder};

  .first {
    font-weight: bold;
  }

  .last {
    margin-left: 16px;
  }
`;

const NullBox = styled.div`
  height: 16px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const Btn = styled.div`
  font-size: 16px;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`;
