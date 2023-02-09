import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewImg1 from '../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../assets/image/review3.jpg';
import Review from './elements/Review';

export default function MasterReview() {
  const [data] = useState([
    {
      content:
        '물말고 불도 나오길래 수리상담 받아봤어요!! 다행히도 이제 물만 잘 나옵니다! 물말고 불도 나오길래 수리상담 받아봤어요!! 다행히도 이제 물만 잘 나옵니다!',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
      reply: '고객님 저희 업체를 이용해주셔서 감사합니다.',
    },
  ]);

  return (
    <Main>
      <Text>리뷰</Text>
      <TableBox>
        <Review review={data[0]} />
      </TableBox>
      <TableBox>
        <Review review={data[0]} />
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
