import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Message from '../../../common/signup/elements/Message';

export default function RepresentativeNameInput({ updateData, initialValue }) {
  const [representativeName, setRepresentativeName] = useState(initialValue);
  const [msg, setMsg] = useState('');
  const changeRepresentativeName = (event) => {
    setRepresentativeName(() => event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsg(() => '상호명을 입력하세요.');
      updateData({ representativeName: null });
      return;
    }
    setMsg(() => '');
    updateData({ representativeName: event.target.value.trim() });
  };

  return (
    <div>
      <TextField
        label="대표자명"
        variant="outlined"
        required
        fullWidth
        value={representativeName}
        onChange={changeRepresentativeName}
      />
      <Message msg={msg} />
    </div>
  );
}
