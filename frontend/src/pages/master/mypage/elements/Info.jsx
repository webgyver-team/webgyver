import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';

export default function AlertDialog({ open, setOpen, info }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [formContent, setFormContent] = useState('');
  useState(() => {
    setFormContent(info);
  }, []);
  const registInfo = () => {
    const data = {
      customerIdx: null,
      partenrIdx: null,
      categoryIdx: null,
      content: formContent,
    };
    // eslint-disable-next-line
    console.log(data);
    handleClose();
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
            value={info}
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
