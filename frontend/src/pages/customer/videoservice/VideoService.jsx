/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/media-has-caption */
// eslint-disable-next-line object-curly-newline
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { userIdx, reservationIdxState, matchFormState } from '../../../atom';
// import Button from '@mui/material/Button';

export default function VideoService() {
  const navigate = useNavigate();
  const customerIdx = useRecoilValue(userIdx);
  const reservationIdx = useRecoilValue(reservationIdxState);
  const setMatchForm = useSetRecoilState(matchFormState);
  const mainVideo = useRef(null);
  const subVideo = useRef(null);
  const conn = useRef(null);
  const myPeerConnection = useRef(null);
  const [screenChange, setScreenChange] = useState(true);
  const screenChange2 = useRef(true);

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

    // 얘는 더이상 있을 필요 없는 matchFormState를 초기화해주기 위함
    setMatchForm(null);
  }, []);

  const routeEndService = () => {
    navigate('/endservice');
  };
  const sendRequest = () => {
    conn.current.send(JSON.stringify({ method: 'WANT_MEET' }));
  };
  // const conn = new WebSocket('wss://webgyver.site:9000/socket');

  useEffect(() => {
    // 내 미디어 가져오기
    const getUserCamera = async () => {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: { exact: 'environment' } },
          audio: false,
        })
        .then((stream) => {
          // 비디오 tag에 stream 추가
          const video = screenChange ? mainVideo.current : subVideo.current;
          video.srcObject = stream;
          video.play();
        });
    };

    // 상대방 미디어 가져오기
    const getOpponentCamera = async () => {
      const remoteStream = await myPeerConnection.current.getReceivers();
      if (remoteStream) {
        const stream = await new MediaStream([
          remoteStream[0].track,
          remoteStream[1].track,
        ]);
        const video = screenChange ? subVideo.current : mainVideo.current;
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
      navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } }, audio: false }).then((stream) => {
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
      `wss://webgyver.site:9001/facetime/customer/${customerIdx}/${reservationIdx}`,
    );
    const configuration = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
    const send = async (message) => {
      // 소켓으로 메세지 보내기
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
    myPeerConnection.current.addEventListener(
      'iceconnectionstatechange',
      async () => {
        if (myPeerConnection.iceConnectionState === 'disconnected') {
          const video = screenChange2.current
            ? subVideo.current
            : mainVideo.current;
          video.srcObject = null;
        } else {
          const remoteStream = await myPeerConnection.current.getReceivers();
          const stream = await new MediaStream([
            remoteStream[0].track,
            remoteStream[1].track,
          ]);
          const video = screenChange2.current
            ? subVideo.current
            : mainVideo.current;
          if (video) {
            setTimeout(() => {
              video.srcObject = stream;
              video.play();
            }, 100);
          }
        }
      },
    );
    myPeerConnection.current.addEventListener('track', (data) => {
      const video = screenChange2.current
        ? subVideo.current
        : mainVideo.current;
      video.srcObject = new MediaStream([data.track]);
      video.play();
    });

    const createOffer = async () => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: { facingMode: { exact: 'environment' } },
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
            video: { facingMode: { exact: 'environment' } },
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
