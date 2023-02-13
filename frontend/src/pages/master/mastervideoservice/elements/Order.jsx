import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DatePicker from '../../../customer/reservation/elements/DatePicker';

export default function AlertDialog({ open, setOpen, registVisit }) {
  const handleClose = () => {
    setOpen(false);
  };
  const today = new Date();
  const [formDate, setFormDate] = useState(
    `${today.getFullYear()}-${
      (today.getMonth() + 1).toString().length === 2
        ? today.getMonth() + 1
        : `0${today.getMonth() + 1}`
    }-${
      today.getDate().toString().length === 2
        ? today.getDate()
        : `0${today.getDate()}`
    }`,
  );

  const [dateText, setDateText] = useState('');
  useEffect(() => {
    const temp = formDate.split('-');
    setDateText(`${temp[0]}${temp[1]}${temp[2]}`);
  }, [formDate]);

  const [formContent, setFormContent] = useState({
    startTime: '08:00',
    endTime: '10:00',
  });
  const registInfo = () => {
    const start = formContent.startTime.split(':');
    const data = {
      method: 'ACCEPT_MEET',
      time: `${dateText}-${start[0]}${start[1]}`,
    };
    registVisit(data);
    // eslint-disable-next-line
    console.log(data);
    handleClose();
  };

  // 시간 변경 함수
  const changeStartTime = (ans) => {
    // Start
    setFormContent((prevState) => {
      return { ...prevState, startTime: ans };
    });
  };

  const changeEndTime = (ans) => {
    // End
    setFormContent((prevState) => {
      return { ...prevState, endTime: ans };
    });
  };

  return (
    <Main>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">방문 예약</DialogTitle>
        <InfoBox>
          <YMD>{dateText}</YMD>
          <Nullbox />
          <DatePicker handleDate={setFormDate} />
          <Nullbox />
          <TimePick>
            <TimeBox>
              <span>시작 시간</span>
              <div> </div>
              <TextField
                id="time"
                type="time"
                value={formContent.startTime}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: 150, marginRight: '8px' }}
                onChange={(e) => changeStartTime(e.target.value)}
              />
            </TimeBox>
            <TimeBox>
              <span>종료 시간</span>
              <div> </div>
              <TextField
                id="time"
                type="time"
                value={formContent.endTime}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: 150, marginRight: '8px' }}
                onChange={(e) => changeEndTime(e.target.value)}
              />
            </TimeBox>
          </TimePick>
        </InfoBox>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={registInfo} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Main>
  );
}

const Main = styled.div`
  max-width: 600px;
`;

const InfoBox = styled.div`
  padding: 8px;
  margin: 8px;
`;

const YMD = styled.p`
  margin-left: 8px;
`;

const TimePick = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const TimeBox = styled.div`
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    pont-size: 24px;
  }

  div {
    min-width: 8px;
  }
`;

const Nullbox = styled.div`
  height: 16px;
`;
