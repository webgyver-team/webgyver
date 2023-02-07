/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { userIdx } from '../../../../atom';
import { master } from '../../../../api/masterService';

// eslint-disable-next-line object-curly-newline
export default function AlertDialog({ open, setOpen, hour, setHour }) {
  const [masterIdx] = useRecoilState(userIdx);
  const [formContent, setFormContent] = useState([]);
  useEffect(() => {
    setFormContent(JSON.parse(JSON.stringify(hour)));
  }, [hour]);

  const handleClose = () => {
    setFormContent(hour);
    setOpen(false);
  };

  const registInfo = async () => {
    const data = {
      companyTime: formContent,
    };
    // eslint-disable-next-line
    console.log(data);
    const response = await master.put.businessHour(data, masterIdx);
    if (response.statusCode === 200) {
      alert('변경되었습니다.');
    } else {
      alert('오류가 발생했습니다.');
    }

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
