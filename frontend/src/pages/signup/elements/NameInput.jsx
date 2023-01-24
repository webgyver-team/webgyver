import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Message from './Message';

export default function NameInput({ updateData }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const changeName = (event) => {
    setName(() => event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsg(() => '성명을 입력하세요.');
      updateData({ name: null });
      return;
    }
    setMsg(() => '');
    updateData({ name: event.target.value.trim() });
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="이름"
        variant="outlined"
        required
        fullWidth
        value={name}
        onChange={changeName}
      />
      <Message msg={msg} />
    </div>
  );
}
