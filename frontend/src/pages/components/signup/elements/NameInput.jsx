import React, { useState } from 'react';

export default function NameInput() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const changeName = (event) => {
    setName(() => event.target.value);
    console.log(name);
    if (event.target.value.trim().length === 0) {
      setMsg(() => '성명을 입력하세요.');
    } else setMsg(() => '');
  };

  return (
    <div>
      <label htmlFor="name" style={{ fontSize: '16px', fontWeight: 'bold' }}>
        이름
        {/* label 글자 크기 16px */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <input
            type="text"
            id="name"
            name="name"
            onChange={changeName}
            required
            style={{ width: '92%', border: '2px solid black' }}
          />
        </div>
        {/* p 글자 크기 16px */}
        <p style={{ color: 'red' }}>{msg}</p>
      </label>
    </div>
  );
}
