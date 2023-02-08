import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import ReviewImg1 from '../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../assets/image/review3.jpg';
import RealTime from './elements/RealTime';

export default function MasterSchedule() {
  const [data] = useState([
    {
      title: '뜨거운 물이 나오지 않는 건에 대하여',
      content:
        '수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!',
      price: '3000원',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
    },
  ]);
  const [gWebSocket, setgWebSocket] = useState(null);
  const webSocketAddress = 'ws://localhost:9000/realtime/customer/1';
  useLayoutEffect(() => {
    setgWebSocket(new WebSocket(webSocketAddress));
    gWebSocket.onopen = () => {
      // 첫 접속
      const socketData = JSON.stringify({
        method: 'INIT',
        lng: Math.random(),
        lat: Math.random(),
      });
      gWebSocket.send(socketData);
    };
    /**
     * 웹소켓 메시지(From Server) 수신하는 경우 호출
     */
    gWebSocket.onmessage = (message) => {
      const socketData = JSON.parse(message.data);
      console.log(socketData);
      // addLineToChatBox(JSON.stringify(data));
      // addLineToChatBox('-----------------------------');
    };

    /**
     * 웹소켓 사용자 연결 해제하는 경우 호출
     */
    gWebSocket.onclose = () => {
      // addLineToChatBox('Server is disconnected.');
    };

    /**
     * 웹소켓 에러 발생하는 경우 호출
     */
    gWebSocket.onerror = () => {
      // addLineToChatBox('Error!');
    };
  }, [gWebSocket]);

  return (
    <Main>
      <Text>현재 대기중인 실시간 상담</Text>
      <TableBox>
        <RealTime data={data[0]} />
      </TableBox>
      <TableBox>
        <RealTime data={data[0]} />
      </TableBox>
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
