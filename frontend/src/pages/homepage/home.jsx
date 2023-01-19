/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Box from '@mui/material/Box';
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
      <Introduction>
        <Box textAlign="center">출장 전에 화상수리 하세요</Box>
      </Introduction>
      <IntroductionBox>
        <img src={MainImage} alt="이런!" width="60%" />
      </IntroductionBox>
      <NullBox2 />
      <CategoryBox>
        <Titlediv>
          <Box textAlign="center">분야를 선택해주세요</Box>
          {category}
        </Titlediv>
        <CategoryLine left={4} right={5} />
        <CategoryLine left={2} right={3} />
        <CategoryLine left={0} right={1} />
        <CategoryLine left={6} right={7} />
        <CategoryLine left={8} right={9} />
        <NullBox />
      </CategoryBox>
      <LoginLinkBox>
        <Box textAlign="center">전문가 로그인 링크</Box>
      </LoginLinkBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100vw;
`;

const CategoryBox = styled.div`
  width: 100vw;
  border-radius: 40px 40px 0 0;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;

const IntroductionBox = styled.div`
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
`;
const Introduction = styled.div`
  width: 100vw;
  background-color: white;
  display = flex;
  justify-content: center;
  font-size: 16px;
`;

const Titlediv = styled.div`
  width: 100vw;
  display: flex;
  font-size: 8px;
  color: gray;
  justify-content: center;
`;
const NullBox = styled.div`
  height: 16px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;
const NullBox2 = styled.div`
  height: 24px;
  background-color: white;
`;
const LoginLinkBox = styled.div`
  height: 36px;
  background-color: white;
  font-size: 16px;
  color: gray;
`;
