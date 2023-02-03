import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewImg1 from '../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../assets/image/review3.jpg';
import Waiting from './elements/Example';

export default function MasterSchedule() {
  const [historys] = useState([
    {
      content:
        '수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
    },
  ]);

  // const NoData = <NoDataBox>아직 사례가 없습니다.</NoDataBox>;

  return (
    <Main>
      <Text>사례</Text>
      <TableBox>
        <Waiting history={historys[0]} />
      </TableBox>
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

// const NoDataBox = styled.div`
//   text-align: center;
//   font-size: 24px;
// `;
