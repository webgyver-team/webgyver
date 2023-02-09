import React, { useState } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import Message from '../../../common/signup/elements/Message';

export default function CardNumberInput({
  updateData,
  initialValue1,
  initialValue2,
  initialValue3,
  initialValue4,
  initialValueMM,
  initialValueYY,
}) {
  const [cardNumber1, setCardNumber1] = useState(initialValue1);
  const [cardNumber2, setCardNumber2] = useState(initialValue2);
  const [cardNumber3, setCardNumber3] = useState(initialValue3);
  const [cardNumber4, setCardNumber4] = useState(initialValue4);
  const [cardValidMM, setCardValidMM] = useState(initialValueMM);
  const [cardValidYY, setCardValidYY] = useState(initialValueYY);
  const [msg, setMsg] = useState('');

  const onlyNumber = (event) => {
    const input = event.target.value;
    if (Number.isNaN(Number(input))) {
      return false;
    }
    return true;
  };
  const handleCardNumber = (val) => {
    updateData({ cardNumber: val });
  };

  const changeCardNumber = (event, order) => {
    if (!onlyNumber(event)) {
      setMsg('카드 유효기간은 숫자만 입력할 수 있습니다.');
      return;
    }
    setMsg('');
    if (order === 1) {
      setCardNumber1(event.target.value);
      const val = event.target.value + cardNumber2 + cardNumber3 + cardNumber4;
      handleCardNumber(val);
    } else if (order === 2) {
      setCardNumber2(event.target.value);
      const val = cardNumber1 + event.target.value + cardNumber3 + cardNumber4;
      handleCardNumber(val);
    } else if (order === 3) {
      setCardNumber3(event.target.value);
      const val = cardNumber1 + cardNumber2 + event.target.value + cardNumber4;
      handleCardNumber(val);
    } else {
      setCardNumber4(event.target.value);
      const val = cardNumber1 + cardNumber2 + cardNumber3 + event.target.value;
      handleCardNumber(val);
    }
  };

  const handleCardValid = (val) => {
    updateData({ cardValidity: val });
  };
  const changeCardValid = (event, order) => {
    if (!onlyNumber(event)) {
      setMsg('카드 유효기간은 숫자만 입력할 수 있습니다.');
      return;
    }
    setMsg('');
    if (order === 1) {
      setCardValidMM(event.target.value);
      const val = event.target.value + cardValidYY;
      handleCardValid(val);
    } else {
      setCardValidYY(event.target.value);
      const val = cardValidMM + event.target.value;
      handleCardValid(val);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>카드 등록</h2>
        <Message msg={msg} />
      </div>
      <CardNumberForm>
        <TextField
          label="카드번호"
          variant="outlined"
          value={cardNumber1}
          required
          margin="normal"
          style={{ width: '25%' }}
          inputProps={{ maxLength: 4 }}
          onChange={(event) => changeCardNumber(event, 1)}
        />
        <p>-</p>
        <TextField
          type="password"
          variant="outlined"
          value={cardNumber2}
          required
          margin="normal"
          style={{ width: '25%' }}
          inputProps={{ maxLength: 4 }}
          onChange={(event) => changeCardNumber(event, 2)}
        />
        <p>-</p>
        <TextField
          type="password"
          variant="outlined"
          value={cardNumber3}
          required
          margin="normal"
          style={{ width: '25%' }}
          inputProps={{ maxLength: 4 }}
          onChange={(event) => changeCardNumber(event, 3)}
        />
        <p>-</p>
        <TextField
          variant="outlined"
          value={cardNumber4}
          required
          margin="normal"
          style={{ width: '25%' }}
          inputProps={{ maxLength: 4 }}
          onChange={(event) => changeCardNumber(event, 4)}
        />
      </CardNumberForm>
      <CardValidityForm>
        <TextField
          label="유효기간"
          variant="outlined"
          value={cardValidMM}
          required
          placeholder="MM"
          margin="normal"
          inputProps={{ maxLength: 2 }}
          style={{ marginRight: '16px', width: '30%' }}
          onChange={(event) => changeCardValid(event, 1)}
        />
        <TextField
          variant="outlined"
          value={cardValidYY}
          required
          placeholder="YY"
          margin="normal"
          inputProps={{ maxLength: 2 }}
          style={{ marginRight: '16px', width: '30%' }}
          onChange={(event) => changeCardValid(event, 2)}
        />
      </CardValidityForm>
    </div>
  );
}

const CardNumberForm = styled.div`
  display: flex;
  align-items: center;
`;

const CardValidityForm = styled.div`
  display: flex;
  align-items: center;
`;
