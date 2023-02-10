/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/media-has-caption */
// eslint-disable-next-line object-curly-newline
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { userIdx, reservationIdxState } from '../../../atom';
// import Button from '@mui/material/Button';

export default function VideoService() {
  const navigate = useNavigate();
  const myMainScreen = useRef(null);
  const mySubScreen = useRef(null);
  const peerMainScreen = useRef(null);
  const peerSubScreen = useRef(null);
  const customerIdx = useRecoilValue(userIdx);
  const reservationIdx = useRecoilValue(reservationIdxState);
  const [mainScreenState, setMainScreenState] = useState('myScreen');

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
    navigate('/endservice');
  };
  // const conn = new WebSocket('wss://webgyver.site:9000/socket');

  // 내 미디어 가져오기
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

  useEffect(() => {
    getUserCameraMain();
  }, [myMainScreen, mySubScreen]);

  const changeScreen = () => {
    if (mainScreenState === 'myScreen') {
      setMainScreenState('peerScreen');
      getUserCameraSub();
    } else {
      setMainScreenState('myScreen');
      getUserCameraMain();
    }
  };

  const conn = useRef(null);
  const myPeerConnection = useRef(null);
  useLayoutEffect(() => {
    conn.current = new WebSocket(
      `ws://i8b101.p.ssafy.io:9000/facetime/customer/${customerIdx}/${reservationIdx}`,
    );
    console.log(conn.current);
    const configuration = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
    const send = async (message) => {
      // 소켓으로 메세지 보내기
      console.log('보냄: ', message);
      conn.current.send(JSON.stringify(message));
    };
    myPeerConnection.current = new RTCPeerConnection(configuration);
    myPeerConnection.current.addEventListener('track', (data) => {
      // const video = peerMainScreen.current;
      // video.srcObject = new MediaStream([data.track]);
      // video.play();

      const video = peerSubScreen.current;
      video.srcObject = new MediaStream([data.track]);
      video.play();
    });
    myPeerConnection.current.onicecandidate = (event) => {
      send({
        event: 'candidate',
        data: event.candidate,
      });
    };

    const createOffer = async () => {
      const offer = await myPeerConnection.current.createOffer();
      await send({
        event: 'offer',
        data: offer,
      });
    };
    conn.current.onmessage = async (message) => {
      const content = JSON.parse(message.data);
      console.log('받음: ', message);
      if (content.event === 'offer') {
        // offer가 오면 가장먼저 그 오퍼를 리모트 디스크립션으로 등록
        const offer = content.data;
        myPeerConnection.current.setRemoteDescription(offer);

        // 내 미디어
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
          event: 'answer',
          data: answer,
        });
      } else if (content.event === 'answer') {
        const answer = content.data;
        myPeerConnection.current.setRemoteDescription(answer);
      } else if (content.event === 'candidate') {
        // 리모트 디스크립션에 설정되어있는 피어와의 연결방식을 결정
        myPeerConnection.current.addIceCandidate(content.data);
      } else if (content.method === 'TOGETHER') {
        createOffer();
      }
    };
  });

  return (
    <Main>
      <BoxBox>
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
      </BoxBox>
      <NullBox2 width={subScreenWidth} />
      <BoxBox>
        <Btn>
          <span>출장요청</span>
        </Btn>
      </BoxBox>
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
  width: 100%;
  height: 100%;
`;
const BoxBox = styled.div`
  display: flex;
  justify-content: center;
`;

const VideoBox = styled.div`
  position: relative;
  width: 100vw;
  height: ${(props) => props.width}px;
`;

const MainScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92%;
  height: ${(props) => props.width}px;
  position: absolute;
  top: 8%;
  left: 4%;
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
  position: absolute;
  width: 40%;
  height: ${(props) => props.width}px;
  right: 0;
  bottom: -16%;
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

const NullBox2 = styled(NullBox)`
  height: calc(${(props) => props.width}px / 2);
`;
