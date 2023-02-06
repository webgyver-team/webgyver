import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Message from './Message';

export default function IdInput({ updateData, initialValue, checkDuplicate }) {
  const ID_MIN_LENGTH = 6;
  const ID_MAX_LENGTH = 10;
  const [id, setId] = useState(initialValue);
  const [msg, setMsg] = useState('');
  const [idDisabled, setIdDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  // props.setId(() => '자식에서 온 놈이다!!');
  const buttonStyle = {
    height: '56px',
    border: '1px solid black',
    fontSize: '16px',
    width: '28%',
    marginLeft: '16px',
  };

  const changeId = (event) => {
    setId(() => event.target.value); // 아이디에 담아는 놓아주고
    if (
      // eslint-disable-next-line operator-linebreak
      event.target.value.length < ID_MIN_LENGTH ||
      event.target.value.length > ID_MAX_LENGTH
    ) {
      setMsg(
        `아이디는 ${ID_MIN_LENGTH}자 이상 ${ID_MAX_LENGTH}자 이하만 가능합니다.`,
      );
      // 버튼 disabled 먹여 놓고
      setBtnDisabled(() => true);
      return;
    }
    setMsg(() => '');
    setBtnDisabled(() => false);
  };
  const checkExistId = () => {
    // 유효성 검사 한번 들어가자
    if (id.length !== id.trim().length) {
      setMsg(() => '아이디에 띄어쓰기를 포함할 수 없습니다,');
      return;
    }
    setBtnDisabled(() => true);
    // 아이디 중복 검사 axios 호출(일단은 random함수로 대체)
    checkDuplicate(id)
      .then((res) => {
        if (res.statusCode === 201) {
          // 중복이면 경고창 띄우기
          // eslint-disable-next-line
          alert('해당 아이디는 이미 존재합니다.');
          setBtnDisabled(() => false);
          return;
        }
        // 성공 했으면 아이디 input disabled
        // eslint-disable-next-line
        alert('해당 아이디는 사용 가능합니다.');
        updateData({ id });
        setIdDisabled(() => true);
        setBtnDisabled(() => true);
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
  };

  return (
    <div>
      <InputDiv>
        <TextField
          label="아이디"
          variant="outlined"
          required
          inputProps={{ minLength: 6, maxLength: 10 }}
          disabled={initialValue !== '' ? true : idDisabled}
          onChange={changeId}
          value={id}
          fullWidth
        />
        {initialValue === '' ? (
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={checkExistId}
            disabled={btnDisabled}
          >
            검사
          </Button>
        ) : null}
      </InputDiv>
      <Message msg={msg} />
    </div>
  );
}

const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
