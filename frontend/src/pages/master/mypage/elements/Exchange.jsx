/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { master } from '../../../../api/masterService';
import { userIdx } from '../../../../atom';
import Message from '../../../common/signup/elements/Message';

export default function AlertDialog({ open, setOpen, point, setReload }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [idx] = useRecoilState(userIdx);
  const [msg, setMsg] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [exchangePoint, setExchangePoint] = useState('');
  const bankList = [
    '신한',
    '국민',
    '농협',
    '우리',
    '하나',
    '카카오',
    '토스',
    '산업',
    '수협',
    '신협',
  ];
  useLayoutEffect(() => {
    setExchangePoint(point.toLocaleString('ko-kr'));
  }, [point]);
  const onlyNumber = (event) => {
    const input = event.target.value.replaceAll(',', '');
    if (Number.isNaN(Number(input))) {
      return false;
    }
    return true;
  };
  const changeExchangePoint = (event) => {
    if (!onlyNumber(event)) {
      setMsg('포인트는 숫자만 입력할 수 있습니다.');
      return;
    }
    let value = Number(event.target.value.replaceAll(',', ''));
    if (value > point) {
      setMsg('보유 포인트까지 환전할 수 있습니다.');
      return;
    }
    if (value === 0) {
      setMsg('1원 이상부터 환전할 수 있습니다.');
    } else {
      setMsg('');
    }
    value = value.toLocaleString('ko-kr');
    setExchangePoint(value);
  };
  const changeBank = (event) => {
    setBank(event.target.value);
  };
  const handleAccountNumber = (event) => {
    if (!onlyNumber(event)) {
      return;
    }
    setAccountNumber(event.target.value);
  };
  const registInfo = async () => {
    if (bank === '' || accountNumber.trim().length === 0) {
      // eslint-disable-next-line no-alert
      alert('계좌 정보를 입력하세요.');
      return;
    }
    const data = {
      point: Number(exchangePoint.replaceAll(',', '')),
    };
    if (data.point === 0) {
      // eslint-disable-next-line no-alert
      alert('1원 이상부터 환전할 수 있습니다.');
      return;
    }
    // eslint-disable-next-line
    const response = await master.put.point(data, idx);
    if (response.statusCode === 200) {
      // eslint-disable-next-line no-alert
      alert('환전 신청이 접수되었습니다.\n익일 오전 9시에 입금 처리됩니다.');
      setReload(true);
      setBank('');
      setAccountNumber('');
      handleClose();
    } else {
      // eslint-disable-next-line no-alert
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">포인트 환전</DialogTitle>
        <InfoBox>
          <div
            style={{
              marginBottom: '16px',
            }}
          >
            <FormControl sx={{ minWidth: 96 }}>
              {/* 카테고리 선택창 */}
              <InputLabel id="demo-select-small">은행</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={bank}
                label="Bank"
                onChange={changeBank}
              >
                <MenuItem disabled value="">
                  <em>선택</em>
                </MenuItem>
                {bankList.map((b) => (
                  <MenuItem key={b} value={b}>
                    {b}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="계좌번호"
              variant="outlined"
              value={accountNumber}
              inputProps={{ maxLength: 14 }}
              onChange={handleAccountNumber}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="보유 포인트"
              variant="outlined"
              margin="dense"
              value={point.toLocaleString('ko-kr')}
              disabled
            />
            <TextField
              label="환전 포인트"
              variant="outlined"
              margin="dense"
              required
              value={exchangePoint}
              onChange={changeExchangePoint}
            />
            {msg !== '' ? (
              <Message msg={msg} />
            ) : (
              <hr
                style={{
                  margin: '10px 0px',
                  padding: '1px 0px',
                  backgroundColor: 'black',
                }}
              />
            )}
            <TextField
              label="잔여 포인트"
              variant="outlined"
              margin="dense"
              disabled
              value={(
                point - Number(exchangePoint.replaceAll(',', ''))
              ).toLocaleString('ko-kr')}
            />
          </div>
        </InfoBox>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={registInfo} autoFocus>
            환전
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
