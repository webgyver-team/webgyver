import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Message from './Message';

export default function BusinessRegistrationNumberInput({ updateData }) {
  // eslint-disable-next-line operator-linebreak
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState(null);
  // eslint-disable-next-line operator-linebreak
  const [businessRegistrationNumber1, setBusinessRegistrationNumber1] =
    useState('');
  // eslint-disable-next-line operator-linebreak
  const [businessRegistrationNumber2, setBusinessRegistrationNumber2] =
    useState('');
  // eslint-disable-next-line operator-linebreak
  const [businessRegistrationNumber3, setBusinessRegistrationNumber3] =
    useState('');
  const [msg, setMsg] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const checkExistence = () => {
    // 유효성 검사 한번 들어가자
    if (
      // eslint-disable-next-line operator-linebreak
      businessRegistrationNumber.length !==
      businessRegistrationNumber.trim().length
    ) {
      setMsg(() => '사업자등록번호에 띄어쓰기를 포함할 수 없습니다,');
      return;
    }
    setBtnDisabled(() => true);
    // 사업자등록번호 검사 axios 호출(일단은 random함수로 대체)
    if (Math.random() > 0.5) {
      // 중복이면 경고창 띄우기
      // eslint-disable-next-line
      alert('해당 사업자 등록 번호를 조회할 수 없습니다.');
      setBtnDisabled(() => false);
      return;
    }
    // 성공 했으면 아이디 input disabled
    // eslint-disable-next-line
    alert('해당 사업자 등록번호는 사용 가능합니다.');
    updateData({ businessRegistrationNumber });
    setInputDisabled(() => true);
    setBtnDisabled(() => true);
  };

  useEffect(() => {
    // 각각의 phoneNumber가 바뀌었을 때...
    if (
      // eslint-disable-next-line operator-linebreak
      businessRegistrationNumber1.trim().length !== 3 ||
      // eslint-disable-next-line operator-linebreak
      businessRegistrationNumber2.trim().length !== 2 ||
      businessRegistrationNumber3.trim().length !== 5
    ) {
      setBusinessRegistrationNumber(() => null);
      setBtnDisabled(() => true);
      return;
    }
    setBusinessRegistrationNumber(
      // eslint-disable-next-line operator-linebreak
      businessRegistrationNumber1 +
        // eslint-disable-next-line operator-linebreak
        businessRegistrationNumber2 +
        businessRegistrationNumber3,
    );
    setBtnDisabled(() => false);
  }, [
    businessRegistrationNumber1,
    businessRegistrationNumber2,
    businessRegistrationNumber3,
  ]);
  const onlyNumber = (event) => {
    const input = event.target.value;
    if (Number.isNaN(Number(input))) {
      setMsg(() => '사업자등록번호는 숫자만 입력할 수 있습니다.');
      return false;
    }
    setMsg(() => '');
    return true;
  };
  const checkMsg = (value, inputOrder) => {
    // inputOrder: 전화번호 입력창 순서 => 다른 단계 다녀오면 유효성 검사 전체 대상으로 수행 못함..
    switch (inputOrder) {
      case 1:
        if (value.trim().length > 0 && value.trim().length < 3) {
          setMsg(() => '첫번째 사업자등록번호 입력은 3자리 숫자만 가능합니다.');
          return false;
        }
        break;
      case 2:
        if (value.trim().length > 0 && value.trim().length < 2) {
          setMsg(() => '두번째 전화번호 입력은 2자리 숫자만 가능합니다.');
          return false;
        }
        break;
      case 3:
        if (value.trim().length > 0 && value.trim().length < 5) {
          setMsg(() => '세번째 전화번호 입력은 5자리 숫자만 가능합니다.');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const changeBusinessRegistrationNumber1 = (event) => {
    if (!onlyNumber(event)) return;
    // 가능한 숫자: 일단 앞자리는 010으로 고정
    setBusinessRegistrationNumber1(() => event.target.value);
    checkMsg(event.target.value, 1);
  };
  const changeBusinessRegistrationNumber2 = (event) => {
    if (!onlyNumber(event)) return;
    setBusinessRegistrationNumber2(() => event.target.value);
    checkMsg(event.target.value, 2);
  };
  const changeBusinessRegistrationNumber3 = (event) => {
    if (!onlyNumber(event)) return;
    setBusinessRegistrationNumber3(() => event.target.value);
    checkMsg(event.target.value, 3);
  };

  const buttonStyle = {
    height: '56px',
    border: '1px solid black',
    fontSize: '16px',
  };

  return (
    <div>
      <InputDiv>
        <TextField
          id="outlined-basic"
          label="사업자등록번호"
          variant="outlined"
          value={businessRegistrationNumber1}
          required
          disabled={inputDisabled}
          style={{ width: '36%' }}
          inputProps={{ maxLength: 3 }}
          onChange={changeBusinessRegistrationNumber1}
        />

        <p>-</p>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          value={businessRegistrationNumber2}
          required
          disabled={inputDisabled}
          style={{ width: '12%' }}
          inputProps={{ maxLength: 2 }}
          onChange={changeBusinessRegistrationNumber2}
        />
        <p>-</p>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          value={businessRegistrationNumber3}
          required
          disabled={inputDisabled}
          style={{ width: '20%' }}
          inputProps={{ maxLength: 5 }}
          onChange={changeBusinessRegistrationNumber3}
        />
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={checkExistence}
          disabled={btnDisabled}
        >
          검사
        </Button>
      </InputDiv>

      <Message msg={msg} />
    </div>
  );
}

const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
