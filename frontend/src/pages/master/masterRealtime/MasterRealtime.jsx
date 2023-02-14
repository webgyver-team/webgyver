/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {
  useState, useLayoutEffect, useEffect, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import RealTime from './elements/RealTime';
import {
  userIdx, reservationIdxState, locateValueState, matchFormState,
} from '../../../atom';

export default function MasterSchedule() {
  const navigate = useNavigate();
  const idx = useRecoilValue(userIdx);
  const setReservationIdx = useSetRecoilState(reservationIdxState);
  const setMatchForm = useSetRecoilState(matchFormState);
  const locationValue = useRecoilValue(locateValueState);
  const [data, setData] = useState([]);
  const webSocketAddress = `wss://webgyver.site:9001/realtime/seller/${idx}`;
  const gWebSocket = useRef(null);

  useEffect(() => {
    return () => {
      gWebSocket.current.close();
    };
  }, []);

  useLayoutEffect(() => {
    gWebSocket.current = new WebSocket(webSocketAddress);
    gWebSocket.current.onopen = () => {
      // 첫 접속
      const socketData = JSON.stringify({
        method: 'INIT',
        lng: locationValue.longitude,
        lat: locationValue.latitude,
      });
      gWebSocket.current.send(socketData);
    };
    /**
     * 웹소켓 메시지(From Server) 수신하는 경우 호출
     */
    gWebSocket.current.onmessage = (message) => {
      const socketData = JSON.parse(message.data);
      if (socketData.method === 'GO_FACE_TIME') {
        setReservationIdx(socketData.data.reservationIdx);
        navigate('/master/videoservice');
      }
      setData(socketData);
      // addLineToChatBox(JSON.stringify(data));
      // addLineToChatBox('-----------------------------');
    };

    /**
     * 웹소켓 사용자 연결 해제하는 경우 호출
     */
    gWebSocket.current.onclose = () => {
      // addLineToChatBox('Server is disconnected.');
    };

    /**
     * 웹소켓 에러 발생하는 경우 호출
     */
    gWebSocket.current.onerror = () => {
      // addLineToChatBox('Error!');
    };
  }, []);
  const acceptReservation = (customerIdx, matchData) => {
    setMatchForm(matchData);
    const socketData = JSON.stringify({
      method: 'MAKE_RESERVATION',
      customerIdx,
    });
    gWebSocket.current.send(socketData);
  };

  const NoData = <NoDataBox>대기 중인 실시간 내역이 없습니다.</NoDataBox>;

  return (
    <Main>
      <Text>현재 대기중인 실시간 상담</Text>
      {data.length === 0 && NoData}
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

const NoDataBox = styled.div`
  text-align: center;
  font-size: 24px;
  min-width: 70vw;
  margin: 16px;
`;
