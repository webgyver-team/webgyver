/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import CustomerSignUp from './pages/customer/signup/CustomerSignUp';
import MasterSignUp from './pages/master/masterSignUp/MasterSignUp';
import { normal } from './theme/theme';
import Home from './pages/customer/homepage/home';
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
import MasterLogin from './pages/master/masterLogin/MasterLogin';
import MasterNavBar from './components/master/navbar/MasterNavBar';
import PrivateRoute from './components/common/privateroute/PrivateRoute';
import MasterVideoService from './pages/master/mastervideoservice/MasterVideoService';
import MasterEndService from './pages/master/masterendservice/MasterEndService';
import { authState } from './atom';

// 네브바가 없어도 되는 url
const notNavList = ['/videoservice', '/master'];

function App() {
  const [auth] = useRecoilState(authState);
  // const [url, setUrl] = useState(''); // 현재 url
  const [onNav, setOnNav] = useState(true);
  // 마스터 url에 위치하는지 판단
  const [onMaster, setOnMaster] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // setUrl(location.pathname);
    notNavList.includes(location.pathname) ? setOnNav(false) : setOnNav(true);
    location.pathname.includes('/master')
      ? setOnMaster(true)
      : setOnMaster(false);
  }, [location]);
  return (
    <>
      {/* styled-component에서 제공하는 ThemeProvider, 하위 모든 컴포넌트에 대해서 해당 프롭스를 전부 전달 한다. */}
      <ThemeProvider theme={normal}>
        <All>
          <Main>
            {onNav
              && (auth === 'master' ? <MasterNavBar /> : <CustomerNavBar />)}
            <LoginModal />
            <MasterInfo />
            <LocateModal />
            <Page isMaster={onMaster}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<CustomerSignUp />} />
                <Route path="/master/signup" element={<MasterSignUp />} />
                <Route path="/select" element={<Select />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route
                  path="/reservation/form"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<ReservationForm />}
                    />
                  }
                />
                <Route path="/match" element={<Match />} />
                <Route path="/match/form" element={<MatchForm />} />
                <Route path="/sellerinfo" element={<MasterInfo />} />
                <Route path="/usagehistory" element={<UsageHistory />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/videoservice" element={<VideoService />} />
                <Route path="/master/videoservice" element={<MasterVideoService />} />
                <Route path="/mypage/update" element={<MyPageUpdate />} />
                <Route path="/endservice" element={<EndService />} />
                <Route path="/master/endservice" element={<MasterEndService />} />
                <Route path="/reviewform" element={<ReviewForm />} />
                <Route path="/master/login" element={<MasterLogin />} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </Page>
          </Main>
        </All>
      </ThemeProvider>
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
  box-shadow: 0 0 8px 0 ${(props) => props.theme.color.defaultlightColor};
`;

const Page = styled.div`
  min-width: 360px;
  max-width: ${(props) => (props.isMaster ? 'auto' : '768px')};
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.defaultColor};
  background-size: 6px 6px;
  font-family: 'Roboto';
  font-size: 32px;
`;
