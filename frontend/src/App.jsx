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
import UsageHistory from './pages/customer/usagehistory/UsageHistory';
import MyPage from './pages/customer/mypage/MyPage';
import MyPageUpdate from './pages/customer/mypage/MyPageUpdate';
import VideoService from './pages/customer/videoservice/VideoService';
import EndService from './pages/customer/endservice/EndService';
import ReviewForm from './pages/customer/reviewfrom/ReviewForm';
import MasterLogin from './pages/master/masterLogin/MasterLogin';
import MasterMyPageUpdate from './pages/master/mypage/MyPageUpdate';
import MasterNavBar from './components/master/navbar/MasterNavBar';
import MasterVideoService from './pages/master/mastervideoservice/MasterVideoService';
import MasterEndService from './pages/master/masterendservice/MasterEndService';
import MasterSchedule from './pages/master/masterschedule/MasterSchedule';
import MasterRealtime from './pages/master/masterRealtime/MasterRealtime';
import MasterReview from './pages/master/masterReview/MasterReview';
import MasterExample from './pages/master/masterExample/MasterExample';
import MasterMypage from './pages/master/mypage/Mypage';
import MasterHistory from './pages/master/history/History';
import TimePicker from './components/master/reservationTime/TimePicker';
// 라우트 가드용
import PrivateRoute from './components/common/privateroute/PrivateRoute';
import PrivateRouteMaster from './components/common/privateroute/PrivateRouteMaster';
import { authState } from './atom';

// 네브바가 없어도 되는 url
const notNavList = [
  '/videoservice',
  '/master/login',
  '/master/videoservice',
  '/master/signup',
];

function App() {
  const [auth] = useRecoilState(authState);
  // const [url, setUrl] = useState(''); // 현재 url
  const [isNav, setIsNav] = useState(true);
  // 마스터 url에 위치하는지 판단
  const [onMaster, setOnMaster] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // setUrl(location.pathname);
    notNavList.includes(location.pathname) ? setIsNav(false) : setIsNav(true);
    location.pathname.includes('/master')
      ? setOnMaster(true)
      : setOnMaster(false);
  }, [location]);

  // 모바일 100vh 맞추는 로직
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
  });

  return (
    <>
      {/* styled-component에서 제공하는 ThemeProvider, 하위 모든 컴포넌트에 대해서 해당 프롭스를 전부 전달 한다. */}
      <ThemeProvider theme={normal}>
        <All>
          <Main>
            {isNav && (onMaster ? <MasterNavBar /> : <CustomerNavBar />)}
            {isNav && !onMaster && <LoginModal />}
            {isNav && !onMaster && <MasterInfo />}
            <LocateModal />
            {isNav && onMaster && <TimePicker />}
            <Page isMaster={onMaster} isNav={isNav}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<CustomerSignUp />} />
                <Route path="/select" element={<Select />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/master/login" element={<MasterLogin />} />
                {/* 아래부터 로그인 유저만 접근 가능 */}
                {/* 일반 고객 URL */}
                <Route
                  path="/reservation/form"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<ReservationForm />}
                    />
                  }
                />
                <Route
                  path="/match"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<Match />}
                    />
                  }
                />
                <Route
                  path="/match/form"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<MatchForm />}
                    />
                  }
                />
                <Route
                  path="/usagehistory"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<UsageHistory />}
                    />
                  }
                />
                <Route
                  path="/mypage"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<MyPage />}
                    />
                  }
                />
                <Route
                  path="/videoservice"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<VideoService />}
                    />
                  }
                />
                <Route
                  path="/mypage/update"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<MyPageUpdate />}
                    />
                  }
                />
                <Route
                  path="/reviewform"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<ReviewForm />}
                    />
                  }
                />
                <Route
                  path="/reviewform/:rIdx"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<ReviewForm />}
                    />
                  }
                />
                <Route
                  path="/endservice"
                  element={
                    <PrivateRoute
                      authenticated={auth}
                      component={<EndService />}
                    />
                  }
                />
                {/* 마스터 URL */}
                <Route
                  path="/master/endservice"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterEndService />}
                    />
                  }
                />
                <Route
                  path="/master/schedule"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterSchedule />}
                    />
                  }
                />
                <Route
                  path="/master/videoservice"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterVideoService />}
                    />
                  }
                />
                <Route
                  path="/master/realtime"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterRealtime />}
                    />
                  }
                />
                <Route
                  path="/master/review"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterReview />}
                    />
                  }
                />
                <Route
                  path="/master/example"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterExample />}
                    />
                  }
                />
                <Route
                  path="/master/mypage"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterMypage />}
                    />
                  }
                />
                <Route
                  path="/master/signup"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterSignUp />}
                    />
                  }
                />
                <Route
                  path="/master/mypage/update"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterMyPageUpdate />}
                    />
                  }
                />
                <Route
                  path="/master/history"
                  element={
                    <PrivateRouteMaster
                      authenticated={auth}
                      component={<MasterHistory />}
                    />
                  }
                />
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
  align-items: center;
  color: ${(props) => props.theme.color.defaultColor};
  background-size: 6px 6px;
  font-family: 'Roboto';
  font-size: 32px;
  // height: 'calc(var(--vh,1vh) * 100)');
  height: ${(props) => (props.isNav
    ? 'calc(var(--vh,1vh) * 100 - 64px)'
    : 'calc(var(--vh,1vh) * 100)')};
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.color.defaultWhite};

  @media screen and (max-width: 600px) {
    height: ${(props) => (props.isNav
    ? 'calc(var(--vh,1vh) * 100 - 56px)'
    : 'calc(var(--vh,1vh) * 100)')};
  }
`;
