/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../atom';
import CategoryLine from './elements/categoryline';
import MainImage from '../../assets/image/MainImage_2.png';

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
      <div width="100vw">설명</div>
      <IntroductionBox>
        <img src={MainImage} alt="이런!" width="60%" />
      </IntroductionBox>
      <NullBox2 />
      <CategoryBox>
        <Titlediv>{category}</Titlediv>
        <CategoryLine left={4} right={5} />
        <CategoryLine left={2} right={3} />
        <CategoryLine left={0} right={1} />
        <CategoryLine left={6} right={7} />
        <CategoryLine left={8} right={9} />
      </CategoryBox>
      <NullBox />
    </Main>
  );
}

const Main = styled.div`
  width: 100vw;
`;

const CategoryBox = styled.div`
  width: 100vw;
  border-radius: 40px 40px 0 0;
  background-color: gray;
`;

const IntroductionBox = styled.div`
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const Titlediv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const NullBox = styled.div`
  height: 136px;
`;

const NullBox2 = styled.div`
  height: 24px;
`;
