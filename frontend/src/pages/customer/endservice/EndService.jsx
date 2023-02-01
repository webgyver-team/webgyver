import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function EndService() {
  const navigate = useNavigate();
  const data = {
    storeName: 'gd',
    personName: 'gdgd',
    content: 'gdgdgd',
    price: '5000',
  };
  const routeVideoService = () => navigate('/videoservice');

  return (
    <Main>
      <Header>상담이 완료되었습니다.</Header>
      <NullBox />
      <InfoBox>
        <Line>
          <span className="first">상호명 : </span>
          <span className="last">{data.storeName}</span>
        </Line>
        <NullBox />
        <Line>
          <span className="first">판매자 : </span>
          <span className="last">{data.personName}</span>
        </Line>
        <NullBox />
        <Line>
          <span className="first">문의 제목 : </span>
          <span className="last">{data.content}</span>
        </Line>
      </InfoBox>
      <NullBox />
      <TransparentBox>
        <Line>
          <span className="first">상담이용료</span>
          <span className="last">{`${data.price} 원`}</span>
        </Line>
        <NullBox />
        <NullBox />
      </TransparentBox>
      <BoxBox>
        <GrayBtn onClick={routeVideoService}>다시 연결하기</GrayBtn>
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

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
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
    content-align: center;
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
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
    margin-right: 16px;
    font-size: 24px;
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
