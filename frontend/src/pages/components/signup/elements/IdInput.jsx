import React, { useState } from 'react';
import Button from '@mui/material/Button';

export default function IdInput() {
  const ID_MIN_LENGTH = 6;
  const ID_MAX_LENGTH = 10;
  const [id, setId] = useState('');
  const [msg, setMsg] = useState('');
  const [idDisabled, setIdDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const smallFont = {
    fontSize: '16px',
    fontWeight: 'bold',
  };
  const changeId = (event) => {
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
      //   console.log('현재 버튼 비활성화..');
      return;
    }
    setMsg(() => '');
    setBtnDisabled(() => false);
    // console.log('현재 버튼 활성화..');
    setId(() => event.target.value);
  };
  const checkExistId = () => {
    // 유효성 검사 한번 들어가자
    if (id.length !== id.trim().length) {
      // alert("아이디에 띄어쓰기를 포함할 수 없습니다.");
      setMsg(() => '아이디에 띄어쓰기를 포함할 수 없습니다,');
      return;
    }
    // 아이디 중복 검사 axios 호출(일단은 random함수로 대체)
    // 중복이면 alert?
    if (Math.random() > 0.5) {
      alert('해당 아이디는 이미 존재합니다.');
      return;
    }
    // 성공 했으면 아이디 input disabled
    alert('해당 아이디는 사용 가능합니다.');
    setIdDisabled(() => true);
    setBtnDisabled(() => true);
  };
  return (
    <div>
      <label htmlFor="id" style={smallFont}>
        아이디
        {/* label 글자 크기 16px */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '92%',
            margin: '0px auto',
          }}
        >
          <input
            type="text"
            id="id"
            name="id"
            onChange={changeId}
            required
            disabled={idDisabled}
            style={{ width: '72%', border: '2px solid black' }}
          />
          <Button
            onClick={checkExistId}
            disabled={btnDisabled}
            style={{
              fontSize: '24px',
              width: '80px',
              height: '64px',
              border: '2px solid black',
              marginLeft: '16px',
            }}
          >
            검사
          </Button>
          {/* 버튼 글자 크기 24px */}
        </div>
        <p style={{ color: 'red', textAlign: 'center' }}>{msg}</p>
        {/* p 글자 크기 16px */}
      </label>
    </div>
  );
}
