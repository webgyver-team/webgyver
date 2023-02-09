/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ReviewImg1 from '../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../assets/image/review3.jpg';
import RealTime from './elements/RealTime';
import { userIdx, reservationIdxState } from '../../../atom';

export default function MasterSchedule() {
  const navigate = useNavigate();
  const idx = useRecoilValue(userIdx);
  const setReservationIdx = useSetRecoilState(reservationIdxState);
  const [data, setData] = useState([
    {
      title: '뜨거운 물이 나오지 않는 건에 대하여',
      content:
        '수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!',
      price: '3000원',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
    },
  ]);
  const webSocketAddress = `ws://i8b101.p.ssafy.io:9000/realtime/seller/${idx}`;
  const gWebSocket = useRef(null);
  useLayoutEffect(() => {
    gWebSocket.current = new WebSocket(webSocketAddress);
    gWebSocket.current.onopen = () => {
      // 첫 접속
      const socketData = JSON.stringify({
        method: 'INIT',
        lng: 0,
        lat: 0,
      });
      gWebSocket.current.send(socketData);
    };
    /**
     * 웹소켓 메시지(From Server) 수신하는 경우 호출
     */
    gWebSocket.current.onmessage = (message) => {
      console.log(message);
      const socketData = JSON.parse(message.data);
      if (socketData.method === 'GO_FACE_TIME') {
        setReservationIdx(socketData.data.reservationIdx);
        navigate('/master/videoservice');
      }
      console.log(socketData);
      setData(socketData);
      // addLineToChatBox(JSON.stringify(data));
      // addLineToChatBox('-----------------------------');
    };

    /**
     * 웹소켓 사용자 연결 해제하는 경우 호출
     */
    gWebSocket.current.onclose = () => {
      console.log('끝');
      // addLineToChatBox('Server is disconnected.');
    };

    /**
     * 웹소켓 에러 발생하는 경우 호출
     */
    gWebSocket.current.onerror = () => {
      // addLineToChatBox('Error!');
    };
  }, []);
  const acceptReservation = (customerIdx) => {
    console.log(gWebSocket.current);
    const socketData = JSON.stringify({
      method: 'MAKE_RESERVATION',
      customerIdx,
    });
    gWebSocket.current.send(socketData);
  };

  return (
    <Main>
      <Text>현재 대기중인 실시간 상담</Text>
      {data.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableBox key={i}>
          <RealTime data={item} acceptReservation={acceptReservation} />
        </TableBox>
      ))}
    </Main>
  );
}

const Main = styled.div`
  witdh: 100%;
  margin: 16px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const TableBox = styled.div`
  width: 100%;
`;
