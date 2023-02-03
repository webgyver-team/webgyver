import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewImg1 from '../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../assets/image/review3.jpg';
import Proceeding from './elements/Proceeding';
import Waiting from './elements/Waiting';

export default function MasterSchedule() {
  const [historys] = useState([
    {
      title: '뜨거운 물이 나오지 않는 건에 대하여',
      content:
        '수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!',
      date: '01월 28일 09:00',
      price: '3000원',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
    },
  ]);

  const NoData = <NoDataBox>예약된 내역이 없습니다.</NoDataBox>;

  return (
    <Main>
      <Text>현재 진행중인 상담</Text>
      <TableBox>
        <Proceeding history={historys[0]} />
      </TableBox>
      <Text>응답 대기중인 예약</Text>
      <TableBox>
        <Waiting history={historys[0]} />
      </TableBox>
      <Text>오늘 예약된 상담</Text>
      <TableBox>{NoData}</TableBox>
    </Main>
  );
}

const Main = styled.div`
  witdh: 100%;
  margin: 16px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const TableBox = styled.div`
  width: 100%;
`;

const NoDataBox = styled.div`
  text-align: center;
  font-size: 24px;
`;
