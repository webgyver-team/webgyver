/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
// import Button from '@mui/material/Button';

export default function VideoService() {
  const myMainScreen = useRef(null);
  const mySubScreen = useRef(null);
  const peerFace = useRef(null);
  const [mainScreenState, setMainScreenState] = useState('myScreen');
  // const conn = new WebSocket('wss://webgyver.site:9000/socket');
  const getUserCameraMain = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        // 비디오 tag에 stream 추가
        const video = myMainScreen.current;

        video.srcObject = stream;

        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserCameraSub = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        // 비디오 tag에 stream 추가
        const video = mySubScreen.current;

        video.srcObject = stream;

        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
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

  // const configuration = {
  //   iceServers: [
  //     {
  //       urls: 'stun:stun.l.google.com:19302',
  //     },
  //   ],
  // };
  // const myConnection = new RTCPeerConnection(configuration);
  // myConnection.addEventListener('track', (data) => {
  //   peerFace.srcObject = new MediaStream([data.track]);
  // });

  return (
    <Main>
      {mainScreenState === 'myScreen' && (
        <VideoBox>
          <MainScreen>
            <video
              playsInline
              autoPlay
              width="100%"
              height="350"
              ref={myMainScreen}
            />
          </MainScreen>

          <SubScreen onClick={changeScreen}>
            <video
              playsInline
              autoPlay
              width="120"
              height="120"
              ref={peerFace}
            />
          </SubScreen>
        </VideoBox>
      )}

      {mainScreenState === 'peerScreen' && (
        <VideoBox>
          <MainScreen>
            <video
              playsInline
              autoPlay
              width="100%"
              height="350"
              ref={peerFace}
            />
          </MainScreen>

          <SubScreen onClick={changeScreen}>
            <video
              playsInline
              autoPlay
              width="120"
              height="120"
              ref={mySubScreen}
            />
          </SubScreen>
        </VideoBox>
      )}
    </Main>
  );
}
const Main = styled.div`
  width: 100%;
  height: 100%;
`;

const VideoBox = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`;

const MainScreen = styled.div`
  position: absolute;
  left: 0%;
  top: 5%;
  z-index: 1;
`;

const SubScreen = styled.div`
  position: absolute;
  right: 5%;
  bottom: 30%;
  z-index: 2;
  background-color: ${(props) => props.theme.color.defaultColor};
`;
