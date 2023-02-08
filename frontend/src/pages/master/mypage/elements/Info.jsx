/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { master } from '../../../../api/masterService';
import { userIdx } from '../../../../atom';

export default function AlertDialog({ open, setOpen, info }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [idx] = useRecoilState(userIdx);

  const [formContent, setFormContent] = useState('');
  useLayoutEffect(() => {
    setFormContent(info);
  }, []);
  const changeContent = (event) => {
    setFormContent(event.target.value);
  };
  const registInfo = async () => {
    const data = {
      companyDescription: formContent,
    };
    // eslint-disable-next-line
    const response = await master.put.description(data, idx);
    if (response.statusCode === 200) {
      handleClose();
    } else {
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
        <DialogTitle id="alert-dialog-title">소개글 변경하기</DialogTitle>
        <InfoBox>
          <TextField
            label="내용"
            variant="outlined"
            required
            fullWidth
            multiline
            rows={10}
            style={{ minWidth: '360px' }}
            value={formContent}
            onChange={changeContent}
          />
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
