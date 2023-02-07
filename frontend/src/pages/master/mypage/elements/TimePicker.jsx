/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// eslint-disable-next-line object-curly-newline
export default function AlertDialog({ open, setOpen, hour, setHour }) {
  const [formContent, setFormContent] = useState([]);
  useEffect(() => {
    setFormContent(JSON.parse(JSON.stringify(hour)));
  }, [hour]);

  const handleClose = () => {
    setFormContent(hour);
    setOpen(false);
  };

  const registInfo = () => {
    const data = {
      partenrIdx: null,
      businessHour: formContent,
    };
    // eslint-disable-next-line
    console.log(data);
    handleClose();
  };

  // 시간 변경 함수
  const changeOpenTime = (idx, ans) => {
    // open
    setFormContent((prevState) => {
      const temp = prevState;
      temp[idx].open = ans;
      return temp;
    });
    setFormContent([...formContent]);
  };

  const changeCloseTime = (idx, ans) => {
    // close
    setFormContent((prevState) => {
      const temp = prevState;
      temp[idx].close = ans;
      return temp;
    });
    setFormContent([...formContent]);
  };

  const changeIsHoliday = (idx) => {
    // close
    setFormContent((prevState) => {
      const temp = prevState;
      temp[idx].isHoliday = !temp[idx].isHoliday;
      return temp;
    });
    setFormContent([...formContent]);
  };

  const update = () => {
    setHour(formContent);
    registInfo();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">영업시간 변경하기</DialogTitle>
        <InfoBox>
          {formContent.map((el, i) => (
            <div key={i}>
              <TimeBox>
                <Day>{el.day}</Day>
                <TextField
                  id="time"
                  type="time"
                  value={el.open}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 150, marginRight: '8px' }}
                  onChange={(e) => changeOpenTime(i, e.target.value)}
                />
                <TextField
                  id="time"
                  type="time"
                  value={el.close}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 150 }}
                  onChange={(e) => changeCloseTime(i, e.target.value)}
                />
                <CheckDiv>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={el.isHoliday}
                        onChange={() => {
                          changeIsHoliday(i);
                        }}
                      />
                    }
                    label="휴무"
                  />
                </CheckDiv>
              </TimeBox>
            </div>
          ))}
        </InfoBox>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={update} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const InfoBox = styled.div`
  padding: 8px;
`;

const TimeBox = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;
`;

const Day = styled.span`
  margin-right: 8px;
`;

const CheckDiv = styled.div`
  margin-left: 8px;
`;
