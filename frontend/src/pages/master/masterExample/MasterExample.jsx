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
        '물이 아니라 불이 나오는 고객님이 계셨습니다. 다행스럽게도 큰일나기 전에, 전화상담을 통해서 연결된 밸브를 제거하고 온수로 재연결하셨습니다.',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
    },
  ]);

  // const NoData = <NoDataBox>아직 사례가 없습니다.</NoDataBox>;

  return (
    <Main>
      <BtnBox>
        <StateBtn>
          <span>작성하기</span>
        </StateBtn>
      </BtnBox>
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

const TableBox = styled.div`
  width: 100%;
`;

const BtnBox = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: row-reverse;
`;

const StateBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  padding: 0 16px 0 16px;
  height: 40px;
  width: 100px;
  box-shadow: 1px 1px 4px 0px ${(props) => props.theme.color.dafaultBorder};
  background-color: ${(props) => props.theme.color.defaultWhite};
  color: ${(props) => props.theme.color.defaultColor};
  cursor: pointer;
`;

// const NoDataBox = styled.div`
//   text-align: center;
//   font-size: 24px;
// `;
