import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Message from '../../../common/signup/elements/Message';

export default function BusinessNameInput({ updateData }) {
  const [businessName, setBusinessName] = useState('');
  const [msg, setMsg] = useState('');
  const changeBusinessName = (event) => {
    setBusinessName(() => event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsg(() => '상호명을 입력하세요.');
      updateData({ businessName: null });
      return;
    }
    setMsg(() => '');
    updateData({ businessName: event.target.value.trim() });
  };

  return (
    <div>
      <TextField
        label="상호명"
        variant="outlined"
        required
        fullWidth
        value={businessName}
        onChange={changeBusinessName}
      />
      <Message msg={msg} />
    </div>
  );
}
