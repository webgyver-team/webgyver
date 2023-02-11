/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
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

  const conn = useRef(null);
  const myPeerConnection = useRef(null);

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
  const sendRequest = () => {
    console.log(conn.current);
    conn.current.send(JSON.stringify({ method: 'WANT_MEET' }));
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

  useLayoutEffect(() => {
    getUserCameraMain();
  });

  useEffect(() => {
    if (mainScreenState === 'peerScreen' && myPeerConnection) {
      getUserCameraSub();
      const remoteStream = myPeerConnection.current.getRemoteStreams()[0];
      if (remoteStream) {
        const video = peerMainScreen.current;
        if (video) {
          setTimeout(() => {
            video.srcObject = remoteStream;
            video.play();
          }, 500);
        }
      }
    } else if (mainScreenState === 'myScreen') {
      getUserCameraMain();
      const remoteStream = myPeerConnection.current.getRemoteStreams()[0];
      if (remoteStream) {
        const video = peerSubScreen.current;
        if (video) {
          setTimeout(() => {
            video.srcObject = remoteStream;
            video.play();
          }, 500);
        }
      }
    }
  }, [mainScreenState]);

  const changeScreen = () => {
    if (mainScreenState === 'myScreen') {
      setMainScreenState('peerScreen');
    } else {
      setMainScreenState('myScreen');
    }
  };

  useEffect(() => {
    return () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        stream.getTracks().forEach((track) => {
          myPeerConnection.current.getSenders().forEach((sender) => {
            if (sender.track === track) {
              sender.track.stop();
              sender.replaceTrack(null);
            }
          });
        });
        stream.getTracks().forEach((track) => track.stop());
      });
      conn.current.close();
      window.location.reload();
    };
  }, []);

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
    const sendCandidate = (event) => {
      send({
        method: 'CANDIDATE',
        data: event.candidate,
      });
    };
    myPeerConnection.current = new RTCPeerConnection(configuration);
    myPeerConnection.current.onicecandidate = (event) => sendCandidate(event);
    myPeerConnection.current.addEventListener('track', (data) => {
      // const video = peerMainScreen.current;
      // video.srcObject = new MediaStream([data.track]);
      // video.play();

      const video = peerSubScreen.current;
      video.srcObject = new MediaStream([data.track]);
      const playPromise = video.play();
      if (playPromise !== undefined) { playPromise.then((e) => { console.log(e); }).catch(); }
    });

    conn.current.onclose = () => console.log('끝');

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
        })
        .then(async () => {
          const offer = await myPeerConnection.current.createOffer();
          await myPeerConnection.current.setLocalDescription(offer);
          await send({
            method: 'OFFER',
            data: offer,
          });
        });
    };
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
          })
          .then(async () => {
            const answer = await myPeerConnection.current.createAnswer();
            await myPeerConnection.current.setLocalDescription(answer);
            await send({
              method: 'ANSWER',
              data: answer,
            });
          });
      } else if (content.method === 'ANSWER') {
        const answer = content.data;
        console.log(myPeerConnection.current);
        myPeerConnection.current.setRemoteDescription(answer);
      } else if (content.method === 'CANDIDATE') {
        // 리모트 디스크립션에 설정되어있는 피어와의 연결방식을 결정
        myPeerConnection.current.addIceCandidate(content.data);
      } else if (content.method === 'TOGETHER') {
        createOffer();
      }
    };
  }, []);

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
        <Btn onClick={sendRequest}>
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
