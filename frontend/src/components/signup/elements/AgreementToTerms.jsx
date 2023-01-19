import React, { useState } from 'react';
// import styled from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AgreementToTerms() {
  const [agree, setAgree] = useState(false);

  const changeAgree = () => {
    setAgree(() => !agree);
  };
  return (
    <div>
      <div>스크롤 되는 약간의 높이 차지하는 박스</div>
      <FormControlLabel
        control={<Checkbox onClick={changeAgree} />}
        label="약관동의"
      />
    </div>
  );
}
