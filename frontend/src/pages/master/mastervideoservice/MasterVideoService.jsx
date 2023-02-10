/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/media-has-caption */
// eslint-disable-next-line object-curly-newline
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
// import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import Button from '@mui/material/Button';
import SideBar from './elements/SideBar';
import Order from './elements/Order';
import { userIdx, reservationIdxState } from '../../../atom';

export default function MasterVideoService() {
  const navigate = useNavigate();
  const myMainScreen = useRef(null);
  const mySubScreen = useRef(null);
  const masterIdx = useRecoilValue(userIdx);
  const reservationIdx = useRecoilValue(reservationIdxState);
  const peerMainScreen = useRef(null);
  const peerSubScreen = useRef(null);
  const [mainScreenState, setMainScreenState] = useState('peerScreen');

  // 화면 너비 가져오는 로직들
  const MainScreenRef = useRef(null);
  const [mainScreenWidth, setMainScreenWidth] = useState('myScreen');
  useLayoutEffect(() => {
    const handleResize = () => {
      setMainScreenWidth(MainScreenRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
  }, [MainScreenRef]);

  const SubScreenRef = useRef(null);
  const [subScreenWidth, setSubScreenWidth] = useState('myScreen');
  useLayoutEffect(() => {
    const handleResize = () => {
      setSubScreenWidth(SubScreenRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
  }, [SubScreenRef]);

  const videoBoxRef = useRef(null);
  const [videoBoxWidth, setVideoBoxWidth] = useState(0);
  useLayoutEffect(() => {
    const handleResize = () => {
      setVideoBoxWidth(videoBoxRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
  }, [videoBoxRef]);

  // 화면 첫 구성시 비율을 잡기 위한 훅
  useEffect(() => {
    setMainScreenWidth(MainScreenRef.current.offsetWidth);
    setSubScreenWidth(SubScreenRef.current.offsetWidth);
    setVideoBoxWidth(videoBoxRef.current.offsetWidth);
  }, []);

  const routeEndService = () => {
    navigate('/master/endservice');
  };

  // 내 미디어 가져오기
  const getUserCameraSub = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // 비디오 tag에 stream 추가
        const video = mySubScreen.current;

        video.srcObject = stream;

        video.play();
      });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const getUserCameraMain = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // 비디오 tag에 stream 추가
        const video = myMainScreen.current;

        video.srcObject = stream;

        video.play();
      });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  useLayoutEffect(() => {
    getUserCameraMain();
    getUserCameraSub();
  });

  useEffect(() => {
    getUserCameraSub();
  }, [myMainScreen, mySubScreen]);

  const changeScreen = () => {
    if (mainScreenState === 'myScreen') {
      setMainScreenState('peerScreen');
    } else {
      setMainScreenState('myScreen');
    }
  };

  const [visitOrderOpen, setVisitOrderOpen] = useState(true);
  const conn = useRef(null);
  const myPeerConnection = useRef(null);

  useEffect(() => {
    return () => {
      conn.current.close();
    };
  }, []);

  useLayoutEffect(() => {
    conn.current = new WebSocket(
      `ws://i8b101.p.ssafy.io:9000/facetime/seller/${masterIdx}/${reservationIdx}`,
    );
    const configuration = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
    conn.current.onopen = () => console.log('시작');
    const send = async (message) => {
      console.log('보냄: ', message);
      conn.current.send(JSON.stringify(message));
    };
    const sendCandidate = (event) => {
      send({
        method: 'CANDIDATE',
        data: event.candidate,
      });
    };
    myPeerConnection.current = new RTCPeerConnection(configuration);
    console.log(myPeerConnection.current);
    myPeerConnection.current.onicecandidate = sendCandidate;
    myPeerConnection.current.addEventListener('track', (data) => {
      const video = peerMainScreen.current;
      video.srcObject = new MediaStream([data.track]);
      const playPromise = video.play();
      if (playPromise !== undefined) { playPromise.then((e) => { console.log(e); }).catch(); }

      // video = peerSubScreen.current;
      // video.srcObject = new MediaStream([data.track]);
      // video.play();
    });
    const createOffer = async () => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          stream
            .getTracks()
            .forEach((track) => myPeerConnection.current.addTrack(track, stream));
        });
      const offer = await myPeerConnection.current.createOffer();
      myPeerConnection.current.setLocalDescription(offer);
      await send({
        method: 'OFFER',
        data: offer,
      });
    };

    conn.current.onclose = () => console.log('끝');

    conn.current.onmessage = async (message) => {
      const content = JSON.parse(message.data);
      console.log('받고 해체: ', content);
      if (content.method === 'OFFER') {
        // offer가 오면 가장먼저 그 오퍼를 리모트 디스크립션으로 등록
        const offer = content.data;
        myPeerConnection.current.setRemoteDescription(offer);
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: true,
          })
          .then((stream) => {
            stream
              .getTracks()
              .forEach((track) => myPeerConnection.current.addTrack(track, stream));
          });

        const answer = await myPeerConnection.current.createAnswer();
        myPeerConnection.current.setLocalDescription(answer);
        send({
          method: 'ANSWER',
          data: answer,
        });
      } else if (content.method === 'ANSWER') {
        console.log(myPeerConnection.current);
        const answer = content.data;
        myPeerConnection.current.setRemoteDescription(answer);
      } else if (content.method === 'CANDIDATE') {
        myPeerConnection.current.addIceCandidate(content.data);
      } else if (content.method === 'TOGETHER') {
        createOffer();
      }
    };
  }, []);

  return (
    <Main>
      <Order open={visitOrderOpen} setOpen={setVisitOrderOpen} />
      <Side>
        <SideBar />
      </Side>
      <Box1>
        {mainScreenState === 'myScreen' && (
          <VideoBox ref={videoBoxRef} width={videoBoxWidth}>
            <MainScreen ref={MainScreenRef} width={mainScreenWidth}>
              <video playsInline autoPlay width="100%" ref={myMainScreen} />
            </MainScreen>

            <SubScreen
              onClick={changeScreen}
              ref={SubScreenRef}
              width={subScreenWidth}
            >
              <video playsInline autoPlay width="100%" ref={peerSubScreen} />
            </SubScreen>
          </VideoBox>
        )}

        {mainScreenState === 'peerScreen' && (
          <VideoBox ref={videoBoxRef} width={videoBoxWidth}>
            <MainScreen ref={MainScreenRef} width={mainScreenWidth}>
              <video playsInline autoPlay width="100%" ref={peerMainScreen} />
            </MainScreen>

            <SubScreen
              onClick={changeScreen}
              ref={SubScreenRef}
              width={subScreenWidth}
            >
              <video playsInline autoPlay width="100%" ref={mySubScreen} />
            </SubScreen>
          </VideoBox>
        )}
      </Box1>
      <NullBox />
      <BoxBox>
        <RedBtn onClick={routeEndService}>
          <span>상담종료</span>
        </RedBtn>
      </BoxBox>
      <NullBox />
    </Main>
  );
}
const Main = styled.div`
  width: 100vw;
  position: relative;
  top: 5%;
`;

const Side = styled.div`
  position: absolute;
  z-index: 30;
  top: 8%;
`;

const BoxBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Box1 = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
`;

const VideoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  position: relative;
`;

const MainScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  max-height: 700px;
  width: 92%;
  height: ${(props) => props.width}px;
  z-index: 1;
  background-color: ${(props) => props.theme.color.defaultColor};
  box-shadow: 2px 2px 4px 0px ${(props) => props.theme.color.defaultlightColor};
  border-radius: 10px;
  overflow: hidden;
`;

const SubScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: ${(props) => props.width}px;
  z-index: 2;
  background-color: ${(props) => props.theme.color.defaultColor};
  border-radius: 10px;
  overflow: hidden;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 296px;
  height: 64px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => props.theme.color.defaultBlue};
  box-shadow: 2px 2px 4px 0px ${(props) => props.theme.color.defaultlightColor};
  :hover {
    cursor: pointer;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
`;

const RedBtn = styled(Btn)`
  background-color: ${(props) => props.theme.color.defaultRed};
`;

const NullBox = styled.div`
  height: 24px;
`;
