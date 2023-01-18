import React, { useState } from 'react';

export default function PasswordInput() {
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
    } else setMsg2(() => '');
  };

  const changePasswordRepeat = (event) => {
    setPassword2(() => event.target.value);
    setMsg2();
    if (event.target.value !== password) {
      setMsg2(() => '비밀번호가 일치하지 않습니다.');
    } else setMsg2(() => '');
  };

  return (
    <div>
      <label
        htmlFor="password"
        style={{ fontSize: '16px', fontWeight: 'bold' }}
      >
        비밀번호
        {/* label 글자 크기 16px */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <input
            type="password"
            id="password"
            name="password"
            onChange={changePassword}
            required
            style={{ width: '92%', border: '2px solid black' }}
          />
        </div>
        {/* p 글자 크기 16px */}
        <p style={{ color: 'red' }}>{msg}</p>
      </label>

      <label
        htmlFor="password-repeat"
        style={{ fontSize: '16px', fontWeight: 'bold' }}
      >
        비밀번호 확인
        {/* label 글자 크기 16px */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <input
            type="password"
            id="password-repeat"
            name="password-repeat"
            onChange={changePasswordRepeat}
            required
            style={{ width: '92%', border: '2px solid black' }}
          />
        </div>
        {/* p 글자 크기 16px */}
        <p style={{ color: 'red' }}>{msg2}</p>
      </label>
    </div>
  );
}
