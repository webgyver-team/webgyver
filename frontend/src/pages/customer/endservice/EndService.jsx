import React from 'react';
import styled from 'styled-components';

export default function EndService() {
  const data = {
    storeName: '상호명 :  gd',
    personName: '판매자 :  gdgd',
    title: '문의 제목 :  gdgdgd',
  };

  return (
    <Main>
      <div>
        <p>상담이 종료되었습니다.</p>
      </div>
      <BoxBox>
        <InfoBox>
          <span>{data.storeName}</span>
          <span>{data.personName}</span>
          <span>{data.title}</span>
        </InfoBox>
      </BoxBox>
      <BoxBox>
        <Btn>
          <span>리뷰 작성</span>
        </Btn>
      </BoxBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

const BoxBox = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoBox = styled.div`
  font-size: 16px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 64px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
  box-shadow: 2px 2px 4px 0px ${(props) => props.theme.color.defaultlightColor};
  :hover {
    cursor: pointer;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
`;
