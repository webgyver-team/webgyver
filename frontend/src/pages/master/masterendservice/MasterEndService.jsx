import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function MasterEndService() {
  const navigate = useNavigate();
  const data = {
    title: 'gd',
    startTime: '14:30',
    price: '5000',
    currentPoint: '10000',
    visitService: true,
    location: '대전시 유성구 어쩌구',
    visitTime: '2023-02-05 10:00',
  };
  const routeVideoService = () => navigate('/master/videoservice');
  const routeHome = () => navigate('/master/schedule');

  return (
    <Main>
      <Header>상담이 종료되었습니다.</Header>
      <NullBox />
      <InfoBox>
        <Line>
          <span className="first">제목 : </span>
          <span className="last">{data.title}</span>
        </Line>
        <NullBox />
        <Line>
          <span className="first">시간 : </span>
          <span className="last">{data.startTime}</span>
        </Line>
        <NullBox />
        <NullBox />
        <Line>
          <span className="first">결제 완료 : </span>
          <span className="last">{`+${data.price}`}</span>
        </Line>
        <Line>
          <span className="first">보유 포인트 : </span>
          <span className="last">{data.currentPoint}</span>
        </Line>
      </InfoBox>
      <NullBox />
      {data.visitService && (
        <TransparentBox>
          <Line>
            <span className="first">방문 일시</span>
            <span className="last">{data.visitTime}</span>
          </Line>
          <Line>
            <span className="first">방문 위치</span>
            <span className="last">{data.location}</span>
          </Line>
          <NullBox />
          <NullBox />
        </TransparentBox>
      )}
      <BoxBox>
        <GrayBtn onClick={routeVideoService}>다시 연결하기</GrayBtn>
      </BoxBox>
      <BoxBox>
        <BtnBox onClick={routeHome}>
          <Btn>홈으로</Btn>
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
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const InfoBox = styled.div`
  padding: 16px;
  border-radius: 15px;
  width: 40vw;
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
  width: 40vw;

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
  border-radius: 10px;

  :hover {
    cursor: pointer;
  }
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
