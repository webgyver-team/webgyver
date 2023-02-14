/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useRecoilValue } from 'recoil';
import { userIdx } from '../../../atom';
import { master } from '../../../api/masterService';
import HistoryCard from './elements/HistoryCard';

export default function History() {
  const [day, setDay] = useState(dayjs(new Date()));
  const [historyList, setHistoryList] = useState([]);
  const userId = useRecoilValue(userIdx);
  useEffect(() => {
    const selected = String(day.toISOString()).substring(0, 10).replaceAll('-', '');
    const loadhistory = async () => {
      const response = await master.get.history(userId, selected);
      setHistoryList(response.data.reservationList);
    };
    loadhistory();
  }, [day, userId]);

  const NoData = <NoDataBox>해당 일에 내역이 없습니다.</NoDataBox>;

  return (
    <Main>
      <CalendarBox>
        <Titlebox>이전 내역 확인하기</Titlebox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={day}
            onChange={(newValue) => {
              setDay(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </CalendarBox>
      <HistoryBox>
        <HistoryInner>
          <HistoryHeader>
            {`${String(day.$y)}년 ${String(day.$M + 1)}월 ${String(
              day.$D,
            )}일`}
          </HistoryHeader>
          {!historyList.length && NoData}
          {historyList &&
            historyList.map((el, i) => (
              <HistoryCard key={i} history={el} />
            ))}
        </HistoryInner>
      </HistoryBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.color.defaultWhite};
  padding: 16px;
`;

const CalendarBox = styled.div`
  width: 50%;
`;

const Titlebox = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const HistoryBox = styled.div`
  width: 100%;
`;

const HistoryInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HistoryHeader = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const NoDataBox = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 8px;
  width: 90%;
  min-width: 600px;
`;
