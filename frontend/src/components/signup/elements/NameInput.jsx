import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Message from './Message';

export default function NameInput({ getName }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const changeName = (event) => {
    setName(() => event.target.value);
    console.log(name);
    if (event.target.value.trim().length === 0) {
      setMsg(() => '성명을 입력하세요.');
      getName(null);
      return;
    }
    setMsg(() => '');
    getName(event.target.value.trim());
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="이름"
        variant="outlined"
        required
        onChange={changeName}
      />
      <Message msg={msg} />
    </div>
  );
}
