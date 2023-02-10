/* eslint-disable object-curly-newline */
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
import { useRecoilState } from 'recoil';
import { userIdx, resTimePopupState } from '../../../atom';
import { master } from '../../../api/masterService';

// eslint-disable-next-line object-curly-newline
export default function TimePicker() {
  const [hour, setHour] = useState([
    { day: '월요일', open: '', close: '', holiday: false },
    { day: '화요일', open: '', close: '', holiday: false },
    { day: '수요일', open: '', close: '', holiday: false },
    { day: '목요일', open: '', close: '', holiday: false },
    { day: '금요일', open: '', close: '', holiday: false },
    { day: '토요일', open: '', close: '', holiday: false },
    { day: '일요일', open: '', close: '', holiday: false },
    { day: '공휴일', open: '', close: '', holiday: true },
  ]);

  const [sellerIdx] = useRecoilState(userIdx);
  // eslint-disable-next-line prettier/prettier
  const [resTimePopup, setResTimePopup] = useRecoilState(resTimePopupState);
  const [formContent, setFormContent] = useState([]);
  // useEffect(() => {
  //   setFormContent(JSON.parse(JSON.stringify(hour)));
  // }, [hour]);

  const handleClose = () => {
    setFormContent(hour);
    setResTimePopup(false);
  };

  useEffect(() => {
    const loadReviewList = async () => {
      const response = await master.get.booktime(sellerIdx);
      // console.log('hi', response.data);
      if (response.data.bookTimeList === null) {
        // eslint-disable-next-line no-alert
        setFormContent(JSON.parse(JSON.stringify(hour)));
        setResTimePopup(true);
        // eslint-disable-next-line no-alert
        alert('설정된 상담가능 시간이 없습니다.');
      } else {
        // eslint-disable-next-line
        // console.log('response', response.data.bookTimeList);
        setFormContent(response.data.bookTimeList);
      }
    };
    loadReviewList();
  }, [hour, sellerIdx, resTimePopup, setResTimePopup]);

  const registInfo = async () => {
    const data = {
      bookTimeList: formContent,
    };
    // eslint-disable-next-line
    console.log(data);
    const response = await master.put.booktime(data, sellerIdx);
    if (response.statusCode === 200) {
      // eslint-disable-next-line no-alert
      alert('변경되었습니다.');
    } else {
      // eslint-disable-next-line no-alert
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

  const changeHoliday = (idx) => {
    // holiday
    setFormContent((prevState) => {
      const temp = prevState;
      temp[idx].holiday = !temp[idx].holiday;
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
        open={resTimePopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">상담시간 변경하기</DialogTitle>
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
                        checked={el.holiday}
                        onChange={() => {
                          changeHoliday(i);
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
