import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import Message from './Message';

export default function PhoneNumberInput({ updateData }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [phoneNumber3, setPhoneNumber3] = useState('');
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (phoneNumber === null) updateData({ phoneNumber: null });
    else updateData({ phoneNumber });
  }, [phoneNumber, updateData]);
  useEffect(() => {
    // 각각의 phoneNumber가 바뀌었을 때...
    if (phoneNumber1 !== '010') {
      setPhoneNumber(() => null);
      return;
    }
    if (phoneNumber2.trim().length !== 4 || phoneNumber3.trim().length !== 4) {
      setPhoneNumber(() => null);
      return;
    }
    console.log(`완료! :${phoneNumber1}${phoneNumber2}${phoneNumber3}`);
    setPhoneNumber(() => phoneNumber1 + phoneNumber2 + phoneNumber3);
  }, [phoneNumber1, phoneNumber2, phoneNumber3]);
  const onlyNumber = (event) => {
    const input = event.target.value;
    if (Number.isNaN(Number(input))) {
      setMsg(() => '전화번호는 숫자만 입력할 수 있습니다.');
      return false;
    }
    setMsg(() => '');
    return true;
  };
  const checkMsg = (value, inputOrder) => {
    console.log(`${value}를 체크하자.`);
    // inputOrder: 전화번호 입력창 순서 => 다른 단계 다녀오면 유효성 검사 전체 대상으로 수행 못함..
    switch (inputOrder) {
      case 1:
        if (value.trim().length !== 0 && value !== '010') {
          setMsg(() => '첫번째 전화번호 입력은 010만 가능합니다.');
          return false;
        }
        // 여기서는 다른 단계에 문제가 없는지 다시 체크...?
        // checkMsg(phoneNumber2, 2);
        // checkMsg(phoneNumber3, 3);
        break;
      case 2:
        if (value.trim().length > 0 && value.trim().length < 4) {
          setMsg(() => '두번째 전화번호 입력은 4자리 숫자만 가능합니다.');
          return false;
        }
        // checkMsg(phoneNumber1, 1);
        // checkMsg(phoneNumber3, 3);
        break;
      case 3:
        if (value.trim().length > 0 && value.trim().length < 4) {
          setMsg(() => '세번째 전화번호 입력은 4자리 숫자만 가능합니다.');
          return false;
        }
        // checkMsg(phoneNumber1, 1);
        // checkMsg(phoneNumber2, 2);
        break;
      default:
        break;
    }
    return true;
  };

  const changePhoneNumber1 = (event) => {
    if (!onlyNumber(event)) return;
    // 가능한 숫자: 일단 앞자리는 010으로 고정
    setPhoneNumber1(() => event.target.value);
    // setPhoneNumber(`${event.target.value}-${phoneNumber2}-${phoneNumber3}`);
    checkMsg(event.target.value, 1);
  };
  const changePhoneNumber2 = (event) => {
    if (!onlyNumber(event)) return;
    setPhoneNumber2(() => event.target.value);
    // setPhoneNumber(`${phoneNumber1}-${event.target.value}-${phoneNumber3}`);
    checkMsg(event.target.value, 2);
  };
  const changePhoneNumber3 = (event) => {
    if (!onlyNumber(event)) return;
    setPhoneNumber3(() => event.target.value);
    // setPhoneNumber(`${phoneNumber1}-${phoneNumber2}-${event.target.value}`);
    checkMsg(event.target.value, 3);
  };

  //   전화번호 유효성 검사
  //   모두 숫자형태의 input이어야 함
  //   1번 칸: 2자리~3자리 가능 | 010, 011, 지역번호 등 가능
  //   2번 칸: 3자리~4자리 가능
  //   3번 칸: 4자리만 가능
  return (
    <div>
      <InputDiv style={{ width: '100%' }}>
        <TextField
          id="outlined-basic"
          label="전화번호"
          variant="outlined"
          value={phoneNumber1}
          required
          style={{ width: '32%' }}
          inputProps={{ maxLength: 3 }}
          onChange={changePhoneNumber1}
        />

        <p>-</p>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          value={phoneNumber2}
          required
          style={{ width: '32%' }}
          inputProps={{ maxLength: 4 }}
          onChange={changePhoneNumber2}
        />
        <p>-</p>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          value={phoneNumber3}
          required
          style={{ width: '32%' }}
          inputProps={{ maxLength: 4 }}
          onChange={changePhoneNumber3}
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
