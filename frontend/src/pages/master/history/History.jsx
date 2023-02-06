/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import ReviewImg1 from '../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../assets/image/review3.jpg';
import HistoryCard from './elements/HistoryCard';

export default function History() {
  const [value, setValue] = useState(dayjs(new Date()));

  const [data] = useState([
    {
      title: '뜨거운 물이 나오지 않는 건에 대하여',
      content:
        '수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!',
      price: '3000원',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
    },
    {
      title: '뜨거운 물이 나오지 않는 건에 대하여',
      content:
        '수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!',
      price: '3000원',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
    },
  ]);

  return (
    <Main>
      <CalendarBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </CalendarBox>
      <HistoryBox>
        <HistoryInner>
          <HistoryHeader>
            {`${String(value.$y)}년 ${String(value.$M + 1)}월 ${String(
              value.$D,
            )}일`}
          </HistoryHeader>
          {data.map((el) => (
            <HistoryCard data={el} />
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
