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
  return <div>홈페이지임</div>;
}
