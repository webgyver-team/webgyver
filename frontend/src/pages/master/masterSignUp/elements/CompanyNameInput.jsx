import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Message from '../../../common/signup/elements/Message';

export default function CompanyNameInput({ updateData, initialValue }) {
  const [companyName, setCompanyName] = useState(initialValue);
  const [msg, setMsg] = useState('');
  const changeCompanyName = (event) => {
    setCompanyName(() => event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsg(() => '상호명을 입력하세요.');
      updateData({ companyName: null });
      return;
    }
    setMsg(() => '');
    updateData({ companyName: event.target.value.trim() });
  };

  return (
    <div>
      <TextField
        label="상호명"
        variant="outlined"
        required
        fullWidth
        value={companyName}
        onChange={changeCompanyName}
      />
      <Message msg={msg} />
    </div>
  );
}
