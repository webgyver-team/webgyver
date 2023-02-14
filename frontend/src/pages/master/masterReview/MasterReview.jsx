/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Review from './elements/Review';
import { userIdx } from '../../../atom';
import { master } from '../../../api/masterService';

export default function MasterReview() {
  const [reviewList, setReviewList] = useState([]);
  const userId = useRecoilValue(userIdx);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const loadReviewList = async () => {
      const response = await master.get.review(userId);
      setReviewList(response.data.reviews.reverse());
      setReload(false);
    };
    loadReviewList();
  }, [userId, reload]);

  const NoData = <NoDataBox>아직 리뷰가 없습니다.</NoDataBox>;

  return (
    <Main>
      <div>
        <Text>리뷰</Text>
        <TableBox>
          {!reviewList.length && NoData}
          {reviewList &&
            reviewList.map((el, i) => (
              <Review key={i} review={el} setReload={setReload} />
            ))}
        </TableBox>
      </div>
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
  min-width: 70vw;
`;
