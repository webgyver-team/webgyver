import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useRecoilState } from 'recoil';
// import { categoryState } from '../../atom';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import CategoryLine from './elements/categoryline';
import MainImage from '../../../assets/image/MainImage.png';

export default function Home() {
  const navigate = useNavigate();
  const [loadding, setLodding] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLodding(false);
    }, 500);
  }, []);

  if (loadding) {
    return (
      <LoaddingBox>
        <CircularProgress />
      </LoaddingBox>
    );
  }
  const routeMasterLogin = () => navigate('/master/login');
  return (
    <Main>
      <IntroductionBox>
        <img src={MainImage} alt="이런!" width="297px" />
      </IntroductionBox>
      <CategoryBox>
        <Titlediv>분야를 선택해주세요</Titlediv>
        <CategoryLine left={0} right={1} />
        <CategoryLine left={2} right={3} />
        <CategoryLine left={4} right={5} />
        <CategoryLine left={6} right={7} />
        <CategoryLine left={8} right={9} />
        <NullBox />
      </CategoryBox>
      <LoginLinkBox>
        <Titlediv onClick={routeMasterLogin}>전문가 로그인 링크</Titlediv>
      </LoginLinkBox>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;

const LoaddingBox = styled.div`
  height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryBox = styled.div`
  border-radius: 20px 20px 0 0;
  background-color: ${(props) => props.theme.color.defaultBgColor};
`;

const IntroductionBox = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;

  img {
    margin-left: 16px;
  }
`;

const Titlediv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.color.defaultlightColor};

  :last-child {
    cursor: pointer;
  }
`;

const NullBox = styled.div`
  height: 16px;
`;

const LoginLinkBox = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
