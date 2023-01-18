import React, { useState } from 'react';

export default function ResidentNumberInput() {
  const [residentNumber1, setResidentNumber1] = useState('');
  const [residentNumber2, setResidentNumber2] = useState('');
  const [msg, setMsg] = useState('');

  const onlyNumber = (event) => {
    const input = event.target.value;
    if (Number.isNaN(Number(input))) {
      setMsg(() => '주민등록번호는 숫자만 입력할 수 있습니다.');
      return false;
    }
    setMsg(() => '');
    return true;
  };

  const changeResidentNumber1 = (event) => {
    if (!onlyNumber(event)) return;
    if (
      // eslint-disable-next-line operator-linebreak
      event.target.value.trim().length > 0 &&
      event.target.value.trim().length < 6
    ) {
      setMsg(() => '주민등록번호 앞자리 6자리를 입력해주세요.');
    }
    setResidentNumber1(() => event.target.value);
  };
  const changeResidentNumber2 = (event) => {
    if (!onlyNumber(event)) return;
    // 여기는 1~4까지만 가능
    if (event.target.value.trim().length !== 0) {
      const value = Number(event.target.value.trim());
      if (value < 1 || value > 4) {
        setMsg(() => '주민등록번호 뒷자리는 1부터 4까지 가능합니다.');
      }
    }
    setResidentNumber2(() => event.target.value);
  };
  return (
    <div>
      <div>
        <label htmlFor="name" style={{ fontSize: '16px', fontWeight: 'bold' }}>
          주민등록번호 7자리
          {/* label 글자 크기 16px */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <input
              type="text"
              id="resident-number1"
              name="resident-number1"
              required
              onChange={changeResidentNumber1}
              placeholder="앞 6자리"
              value={residentNumber1}
              style={{ width: '40%', border: '2px solid black' }}
            />
            <p style={{ margin: '0 6%' }}>-</p>
            <input
              type="text"
              id="resident-number2"
              name="resident-number2"
              required
              onChange={changeResidentNumber2}
              value={residentNumber2}
              style={{ width: '8%', border: '2px solid black' }}
            />
            <p style={{ width: '30%' }}>&nbsp;* * * * * *&nbsp;</p>
          </div>
          {/* p 글자 크기 16px */}
          {/* <p style={{ color: 'red' }}>{msg}</p> */}
        </label>
        <p style={{ color: 'red' }}>{msg}</p>
      </div>
    </div>
  );
}
