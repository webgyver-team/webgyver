import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Message from './Message';

export default function PasswordInput({ updateData }) {
  const PW_MIN_LENGTH = 6;
  const PW_MAX_LENGTH = 10;
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [msg, setMsg] = useState('');
  const [msg2, setMsg2] = useState('');
  const changePassword = (event) => {
    setPassword(() => event.target.value);
    if (
      // eslint-disable-next-line operator-linebreak
      event.target.value.trim().length !== 0 &&
      // eslint-disable-next-line operator-linebreak
      (event.target.value.length < PW_MIN_LENGTH ||
        event.target.value.length > PW_MAX_LENGTH)
    ) {
      setMsg(
        `비밀번호는 ${PW_MIN_LENGTH}자 이상 ${PW_MAX_LENGTH}자 이하만 가능합니다.`,
      );
    } else setMsg(() => '');
    if (event.target.value !== password2) {
      setMsg2(() => '비밀번호가 일치하지 않습니다.');
      updateData({ password: null });
      return;
    }
    setMsg2(() => '');
    updateData({ password: password2 });
  };

  const changePasswordRepeat = (event) => {
    setPassword2(() => event.target.value);
    setMsg2();
    if (event.target.value !== password) {
      setMsg2(() => '비밀번호가 일치하지 않습니다.');
      updateData({ password: null });
      return;
    }
    updateData({ password });
    setMsg2(() => '');
  };

  return (
    <div>
      <TextField
        type="password"
        id="outlined-basic"
        label="비밀번호"
        variant="outlined"
        required
        fullWidth
        inputProps={{ minLength: 6, maxLength: 10 }}
        onChange={changePassword}
      />
      <Message msg={msg} />
      <TextField
        type="password"
        id="outlined-basic"
        label="비밀번호 확인"
        variant="outlined"
        required
        fullWidth
        inputProps={{ minLength: 6, maxLength: 10 }}
        onChange={changePasswordRepeat}
      />
      <Message msg={msg2} />
    </div>
  );
}
