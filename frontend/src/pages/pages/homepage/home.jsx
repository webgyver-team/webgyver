/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../../atom';

import CategoryLine from './elements/categoryline';

export default function Home() {
  const [loadding, setLodding] = useState(true);
  const category = useRecoilState(categoryState);
  useEffect(() => {
    setTimeout(() => {
      setLodding(false);
    }, 1500);
  }, []);

  if (loadding) {
    return <div>로딩중...</div>;
  }
  return (
    <Main>
      <div>
        <Titlediv>{category}</Titlediv>
        <CategoryLine left={4} right={5} />
        <CategoryLine left={2} right={3} />
        <CategoryLine left={0} right={1} />
        <CategoryLine left={6} right={7} />
        <CategoryLine left={8} right={9} />
      </div>
    </Main>
  );
}

const Main = styled.div`
  width: 100vw;
`;

const Titlediv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
