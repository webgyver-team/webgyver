import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { master } from '../../../api/masterService';
import { reservationIdxState } from '../../../atom';

export default function MasterEndService() {
  const navigate = useNavigate();
  const routeVideoService = () => navigate('/master/videoservice');
  const routeHome = () => navigate('/master/schedule');

  // 로드데이타
  const [data, setData] = useState([]);
  const reservationIdx = useRecoilValue(reservationIdxState);

  useEffect(() => {
    const loadExampleList = async () => {
      const response = await master.get.endservice(reservationIdx);
      setData(response.data);
    };
    // 주소 또는 선택 날짜가 바뀌었으면 storeList 갱신해야
    // eslint-disable-next-line
    loadExampleList();
  }, [reservationIdx]);

  const priceToString = (price) => {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const dateToString = (date) => {
    const dayTimeList = date.split('-');
    // eslint-disable-next-line
    const day = dayTimeList[0].substr(0, 4) + '년 ' + dayTimeList[0].substr(4, 2) + '월 ' + dayTimeList[0].substr(6, 2) + '일'
    // eslint-disable-next-line
    const time = dayTimeList[1].substr(0, 2) + ':' + dayTimeList[1].substr(2, 2)
    return `${day} ${time}`;
  };

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
        <NullBox />
        <Line>
          <span className="first">결제 완료 : </span>
          <span className="last">{`+${priceToString(data.price)}`}</span>
        </Line>
        <Line>
          <span className="first">보유 포인트 : </span>
          <span className="last">{priceToString(data.totalPoint)}</span>
        </Line>
      </InfoBox>
      <NullBox />
      {data.meet && (
        <TransparentBox>
          <Line>
            <span className="first">방문 일시</span>
            <span className="last">{dateToString(data.meet.date)}</span>
          </Line>
          <Line>
            <span className="first">방문 위치</span>
            <span className="last">{`${data.meet.address} ${data.meet.detailAddress}`}</span>
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
    min-width: 68px;
  }

  .last {
    margin-right: 16px;
    font-size: 16px;
    padding-left: 16px;
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
