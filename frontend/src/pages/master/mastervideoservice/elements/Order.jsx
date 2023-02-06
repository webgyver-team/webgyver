import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function AlertDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [formContent, setFormContent] = useState({
    startTime: '08:00',
    endTime: '10:00',
  });
  const registInfo = () => {
    const data = {
      customerIdx: null,
      partenrIdx: null,
      categoryIdx: null,
      date: new Date(),
      time: formContent,
    };
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
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">방문 예약</DialogTitle>
        <InfoBox>
          <p>여기에 날짜 선택</p>
          <div>
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
          </div>
        </InfoBox>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={registInfo} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const InfoBox = styled.div`
  padding: 8px;
  margin: 8px;
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
