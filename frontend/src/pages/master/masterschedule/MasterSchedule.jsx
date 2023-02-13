/* eslint-disable react/no-array-index-key */
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
  // 재렌더링 변수
  const [reload, setReload] = useState(false);
  const [schedule, setScheduleList] = useState([]);
  const userId = useRecoilValue(userIdx);
  useEffect(() => {
    const loadReviewList = async () => {
      const response = await master.get.schedule(userId);
      setScheduleList(response.data);
    };
    loadReviewList();
    setReload(false);
  }, [reload]);

  const NoData = <NoDataBox>예약된 내역이 없습니다.</NoDataBox>;

  return (
    <Main>
      <Text>현재 진행중인 상담</Text>
      <TableBox>
        {!schedule.proceedList?.length && NoData}
        {schedule.proceedList &&
          schedule.proceedList.map((el, i) => (
            <Proceeding proceeding={el} key={i} />
          ))}
      </TableBox>
      <Text>응답 대기중인 예약</Text>
      <TableBox>
        {!schedule.waitingList?.length && NoData}
        {schedule.waitingList &&
          schedule.waitingList.map((el, i) => (
            <Waiting waiting={el} setReload={setReload} key={i} />
          ))}
      </TableBox>
      <Text>오늘 예약된 상담</Text>
      <TableBox>
        {!schedule.todayList?.length && NoData}
        {schedule.todayList &&
          schedule.todayList.map((el, i) => <TodayRes today={el} key={i} />)}
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
