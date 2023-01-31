import React from 'react';
import styled from 'styled-components';

export default function EndService() {
  const data = {
    storeName: 'gd',
    personName: 'gdgd',
    title: 'gdgdgd',
    price: '0 원',
  };

  return (
    <Main>
      <div>
        <p>상담이 종료되었습니다.</p>
      </div>
      <InfoBox>
        <div>
          <span className="first">상호명 : </span>
          <span className="last">{data.storeName}</span>
        </div>
        <NullBox />
        <div>
          <span className="first">판매자 : </span>
          <span className="last">{data.personName}</span>
        </div>
        <NullBox />
        <div>
          <span className="first">문의 제목 : </span>
          <span className="last">{data.title}</span>
        </div>
        <NullBox />
      </InfoBox>
      <NullBox />
      <TransparentBox>
        <div>
          <span className="first">상담이용료</span>
          <br />
          <span className="last">{data.price}</span>
        </div>
      </TransparentBox>
      <BoxBox>
        <GrayBtn>다시 연결하기</GrayBtn>
      </BoxBox>
      <BoxBox>
        <BtnBox>
          <Btn>리뷰 작성</Btn>
        </BtnBox>
      </BoxBox>
    </Main>
  );
}

const Main = styled.div`
  margin: 16px;
  font-size: 16px;
`;

const InfoBox = styled.div`
  padding: 16px;
  border-radius: 15px;
  width: 300px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
  box-shadow: 2px 2px 4px 0px ${(props) => props.theme.color.dafaultBorder};

  .first {
    font-weight: bold;
  }

  .last {
    margin-left: 16px;
    text-align: right;
  }
`;

const NullBox = styled.div`
  height: 16px;
`;

const TransparentBox = styled.div`
  padding: 16px;
  width: 300px;
  .first {
    font-weight: bold;
  }

  .last {
    margin-left: 16px;
    text-align: right;
  }
`;

const BoxBox = styled.div`
  display: flex;
  justify-content: center;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  padding: 16px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;

const Btn = styled.div`
  font-size: 16px;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
`;

const GrayBtn = styled(Btn)`
  color: gray;
`;
