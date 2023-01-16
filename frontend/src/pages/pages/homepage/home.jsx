import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useRecoilState } from 'recoil';

export default function Home() {
  const [loadding, setLodding] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLodding(false);
    }, 1500);
  }, []);

  if (loadding) {
    return <div>로딩중...</div>;
  }
  return (
    <div>
      <h1>홈 페이지임</h1>
      <div>카테고리</div>
    </div>
  );
}
