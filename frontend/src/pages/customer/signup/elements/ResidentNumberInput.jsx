import React, { useState } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import Message from './Message';

export default function ResidentNumberInput({ updateData }) {
  const [residentNumber1, setResidentNumber1] = useState('');
  const [residentNumber2, setResidentNumber2] = useState('******');
  const [msg, setMsg] = useState('');
  const onlyNumber = (input) => {
    if (Number.isNaN(Number(input))) {
      setMsg(() => '주민등록번호는 숫자만 입력할 수 있습니다.');
      return false;
    }
    setMsg(() => '');
    return true;
  };
  const [focus, setFocus] = useState(false);

  const changeFocus = () => {
    setFocus(() => !focus);
  };
  const changeResidentNumber1 = (event) => {
    if (!onlyNumber(event.target.value)) return;
    if (
      // eslint-disable-next-line operator-linebreak
      event.target.value.trim().length > 0 &&
      event.target.value.trim().length < 6
    ) {
      setMsg(() => '주민등록번호 앞자리 6자리를 입력해주세요.');
    }
    setResidentNumber1(() => event.target.value);
    if (
      // eslint-disable-next-line operator-linebreak
      event.target.value.trim().length === 6 &&
      residentNumber2.trim().length === 7
    ) {
      updateData({
        residentNumber:
          event.target.value.trim() + residentNumber2.replaceAll('*', ''),
      });
    } else updateData({ residentNumber: null });
  };
  const changeResidentNumber2 = (event) => {
    const actualInput = event.target.value.replaceAll('*', '');
    if (!onlyNumber(actualInput)) {
      updateData({ residentNumber: null });
      return;
    }
    // 여기는 1~4까지만 가능
    const fakeInput = `${actualInput}******`;
    setResidentNumber2(() => fakeInput);
    if (actualInput.trim().length !== 0) {
      const value = Number(actualInput.trim());
      if (value < 1 || value > 4) {
        setMsg(() => '주민등록번호 뒷자리는 1부터 4까지 가능합니다.');
        return;
      }
    }
    if (residentNumber1.trim().length === 6 && actualInput.length === 1) {
      updateData({ residentNumber: residentNumber1.trim() + actualInput });
    } else updateData(null);
  };
  return (
    <div>
      <InputDiv style={{ width: '100%' }}>
        <TextField
          style={{ width: '48%' }}
          id="outlined-basic"
          label="주민등록번호 앞 6자리"
          variant="outlined"
          value={residentNumber1}
          inputProps={{ maxLength: 6 }}
          required
          onChange={changeResidentNumber1}
        />
        <p>-</p>
        <TextField
          style={{ width: '48%' }}
          id="outlined-basic"
          label="주민등록번호 뒷 1자리"
          variant="outlined"
          value={residentNumber2.length === 7 || focus ? residentNumber2 : ''}
          required
          onFocus={changeFocus}
          onBlur={changeFocus}
          inputProps={{ maxLength: 7 }}
          onChange={changeResidentNumber2}
        />
      </InputDiv>
      <Message msg={msg} />
    </div>
  );
}

const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
