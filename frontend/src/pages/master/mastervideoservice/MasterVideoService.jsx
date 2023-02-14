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
import { userIdx, reservationIdxState, matchFormState } from '../../../atom';

export default function MasterVideoService() {
  const navigate = useNavigate();
  const masterIdx = useRecoilValue(userIdx);
  const reservationIdx = useRecoilValue(reservationIdxState);
  const mainVideo = useRef(null);
  const subVideo = useRef(null);
  const conn = useRef(null);
  const myPeerConnection = useRef(null);
  const [screenChange, setScreenChange] = useState(true);
  const screenChange2 = useRef(true);
  const reservationData = useRecoilValue(matchFormState);
  // 방문 수리 ON/OFF
  const [visitOrderOpen, setVisitOrderOpen] = useState(false);

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

  useEffect(() => {
    // 내 미디어 가져오기
    const getUserCamera = async () => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          // 비디오 tag에 stream 추가
          const video = screenChange ? subVideo.current : mainVideo.current;
          video.srcObject = stream;
          video.play();
        });
    };

    // 상대방 미디어 가져오기
    const getOpponentCamera = async () => {
      const remoteStream = await myPeerConnection.current.getReceivers();
      if (remoteStream) {
        const stream = await new MediaStream([remoteStream[0].track, remoteStream[1].track]);
        const video = screenChange ? mainVideo.current : subVideo.current;
        if (video) {
          setTimeout(() => {
            video.srcObject = stream;
            video.play();
          }, 100);
        }
      }
    };

    getUserCamera();
    getOpponentCamera();
  }, [screenChange]);

  // 비디오 스크린 위치 스왑
  const changeScreen = () => {
    setScreenChange(!screenChange);
    screenChange2.current = !screenChange2.current;
  };

  // 페이지 나갈때 카메라 제거
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
      `ws://i8b101.p.ssafy.io:9000/facetime/seller/${masterIdx}/${reservationIdx}`,
    );
    const configuration = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
    const send = async (message) => {
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
    myPeerConnection.current.addEventListener('iceconnectionstatechange', async () => {
      if (myPeerConnection.iceConnectionState === 'disconnected') {
        const video = screenChange2.current ? mainVideo.current : subVideo.current;
        video.srcObject = null;
      } else {
        const remoteStream = await myPeerConnection.current.getReceivers();
        const stream = await new MediaStream([remoteStream[0].track, remoteStream[1].track]);
        const video = screenChange2.current ? mainVideo.current : subVideo.current;
        if (video) {
          setTimeout(() => {
            video.srcObject = stream;
            video.play();
          }, 100);
        }
      }
    });
    myPeerConnection.current.addEventListener('track', (data) => {
      const video = screenChange2.current ? mainVideo.current : subVideo.current;
      video.srcObject = new MediaStream([data.track]);
      video.play();
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

    conn.current.onclose = () => {
    };

    conn.current.onmessage = async (message) => {
      const content = JSON.parse(message.data);
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
        myPeerConnection.current.setRemoteDescription(answer);
      } else if (content.method === 'CANDIDATE') {
        myPeerConnection.current.addIceCandidate(content.data);
      } else if (content.method === 'TOGETHER') {
        createOffer();
      } else if (content.method === 'WANT_MEET') {
        setVisitOrderOpen(true);
      }
    };
  }, []);

  const registVisit = (data) => {
    conn.current.send(JSON.stringify(data));
  };

  return (
    <Main>
      <Order open={visitOrderOpen} setOpen={setVisitOrderOpen} registVisit={registVisit} />
      <Side>
        {reservationData && <SideBar reservationData={reservationData} />}
      </Side>
      <Box1>
        <VideoBox ref={videoBoxRef} width={videoBoxWidth}>
          <MainScreen ref={MainScreenRef} width={mainScreenWidth}>
            <video playsInline autoPlay width="100%" ref={mainVideo} />
          </MainScreen>

          <SubScreen
            onClick={changeScreen}
            ref={SubScreenRef}
            width={subScreenWidth}
          >
            <video playsInline autoPlay width="100%" ref={subVideo} />
          </SubScreen>
        </VideoBox>
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
