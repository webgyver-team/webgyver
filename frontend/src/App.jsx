import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import CustomerSignUp from './pages/customer/signup/CustomerSignUp';
import ProSignUp from './pages/customer/signup/ProSignUp';
import { normal } from './theme/theme';
import Home from './pages/customer/homepage/home';
// eslint-disable-next-line import/no-unresolved
import CustomerNavBar from './components/customer/navbar/NavBar';
import LocateModal from './components/common/sitepopup/LocateModal';
import Select from './pages/customer/select/Select';
import LoginModal from './components/customer/login/LoginModal';
import Reservation from './pages/customer/reservation/Reservation';
import ReservationForm from './pages/customer/reservation/ReservationForm';
import Match from './pages/customer/match/Match';
import MatchForm from './pages/customer/match/MatchForm';
import MasterInfo from './components/customer/masterInfo/MasterInfo';
import UsageHistory from './pages/customer/usagehistoy/UsageHistory';
import MyPage from './pages/customer/mypage/MyPage';
import MyPageUpdate from './pages/customer/mypage/MyPageUpdate';
import VideoService from './pages/customer/videoservice/VideoService';
import EndService from './pages/customer/endservice/EndService';
import ReviewForm from './pages/customer/reviewfrom/ReviewForm';

function App() {
  return (
    <>
      {/* RecoilRoot로 감싸인 부분 내에서만 Recoil-atom을 가져올 수 있다. */}
      <RecoilRoot>
        {/* styled-component에서 제공하는 ThemeProvider, 하위 모든 컴포넌트에 대해서 해당 프롭스를 전부 전달 한다. */}
        <ThemeProvider theme={normal}>
          <All>
            <Main>
              <CustomerNavBar />
              <LoginModal />
              <MasterInfo />
              <LocateModal />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<CustomerSignUp />} />
                <Route path="/seller/signup" element={<ProSignUp />} />
                <Route path="/select" element={<Select />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/reservation/form" element={<ReservationForm />} />
                <Route path="/match" element={<Match />} />
                <Route path="/match/form" element={<MatchForm />} />
                <Route path="/masterinfo" element={<MasterInfo />} />
                <Route path="/usagehistory" element={<UsageHistory />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/videoservice" element={<VideoService />} />
                <Route path="/mypage/update" element={<MyPageUpdate />} />
                <Route path="/endservice" element={<EndService />} />
                <Route path="/reviewform" element={<ReviewForm />} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </Main>
          </All>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;

const All = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  min-width: 360px;
  max-width: 768px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.defaultColor};
  background-size: 6px 6px;
  font-family: 'Roboto';
  font-size: 32px;
  // line-height: 160%;
  box-shadow: 0 0 8px 0 ${(props) => props.theme.color.defaultlightColor};
`;
