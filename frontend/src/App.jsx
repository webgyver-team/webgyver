import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import { normal } from './theme/theme';
import Home from './pages/homepage/home';
// eslint-disable-next-line import/no-unresolved
import NavBar from './components/navbar/NavBar';
import LocateModal from './components/sitepopup/LocateModal';

function App() {
  return (
    <>
      {/* RecoilRoot로 감싸인 부분 내에서만 Recoil-atom을 가져올 수 있다. */}
      <RecoilRoot>
        {/* styled-component에서 제공하는 ThemeProvider, 하위 모든 컴포넌트에 대해서 해당 프롭스를 전부 전달 한다. */}
        <ThemeProvider theme={normal}>
          <NavBar />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/locate" element={<LocateModal />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Main>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;

const Main = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${(props) => props.theme.color.defaultColor};
  background-image: linear-gradient(
      to bottom,
      transparent,
      transparent 16.6667%,
      ${(props) => props.theme.color.defaultBgColor} 16.6667%
    ),
    linear-gradient(
      to right,
      ${(props) => props.theme.color.defaultDotColor},
      ${(props) => props.theme.color.defaultDotColor} 16.6667%,
      ${(props) => props.theme.color.defaultBgColor} 16.6667%
    );
  background-size: 6px 6px;
  font-size: 36px;
  line-height: 160%;
`;
