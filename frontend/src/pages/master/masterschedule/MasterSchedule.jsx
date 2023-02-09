/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Proceeding from './elements/Proceeding';
import Waiting from './elements/Waiting';
import TodayRes from './elements/TodayRes';
import { userIdx } from '../../../atom';
import { master } from '../../../api/masterService';

export default function MasterSchedule() {
  const [schedule, setScheduleList] = useState([]);
  const userId = useRecoilValue(userIdx);
  useEffect(() => {
    const loadReviewList = async () => {
      const response = await master.get.schedule(userId);
      setScheduleList(response.data);
      console.log('hi', response.data);
    };
    loadReviewList();
  }, []);

  const NoData = <NoDataBox>예약된 내역이 없습니다.</NoDataBox>;

  return (
    <Main>
      <Text>현재 진행중인 상담</Text>
      <TableBox>
        {!schedule.proceedList?.length && NoData}
        {schedule.proceedList &&
          schedule.proceedList.map((el) => <Proceeding proceeding={el} />)}
      </TableBox>
      <Text>응답 대기중인 예약</Text>
      <TableBox>
        {!schedule.waitingList?.length && NoData}
        {schedule.waitingList &&
          schedule.waitingList.map((el) => <Waiting waiting={el} />)}
      </TableBox>
      <Text>오늘 예약된 상담</Text>
      <TableBox>
        {!schedule.todayList?.length && NoData}
        {schedule.todayList &&
          schedule.todayList.map((el) => <TodayRes today={el} />)}
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

const NoDataBox = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 16px;
  width: 70vw;
`;
