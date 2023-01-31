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
      <BoxBox>
        {mainScreenState === 'myScreen' && (
          <VideoBox>
            <MainScreen>
              <video
                playsInline
                autoPlay
                width="90%"
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
                width="90%"
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
      </BoxBox>
      <BoxBox>
        <Btn>
          <span>출장요청</span>
        </Btn>
      </BoxBox>
      <NullBox />
      <BoxBox>
        <RedBtn backgroundColor={(props) => props.theme.color.defaultRed}>
          <span>상담종료</span>
        </RedBtn>
      </BoxBox>
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
  width: 90%;
  height: 400px;
`;

const MainScreen = styled.div`
  position: absolute;
  left: 5%;
  top: 5%;
  z-index: 1;
`;

const SubScreen = styled.div`
  position: absolute;
  right: 5%;
  bottom: 10%;
  z-index: 2;
  background-color: ${(props) => props.theme.color.defaultColor};
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
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
