/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line object-curly-newline
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import './Match.scss';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  locateValueState,
  userIdx,
  categoryState,
  reservationIdxState,
  matchFormState,
} from '../../../atom';

// kakao 가져오기
const { kakao } = window;

export default function Matching() {
  const navigate = useNavigate();
  const routeMatchForm = () => navigate('/match/form');
  const setReservationIdx = useSetRecoilState(reservationIdxState);
  const categoryIdx = String(useRecoilValue(categoryState));
  const idx = useRecoilValue(userIdx);
  const locateValue = useRecoilValue(locateValueState);
  const [watching, setWatching] = useState(0);
  const matchForm = useRecoilValue(matchFormState);
  const webSocketAddress = `ws://i8b101.p.ssafy.io:9000/realtime/customer/${idx}`;
  const gWebSocket = useRef(null);
  const [counter, setCounter] = useState(180);

  useEffect(() => {
    return () => {
      gWebSocket.current.close();
    };
  }, []);

  useEffect(() => {
    if (counter === 0) {
      navigate('/match/form');
    }
    setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  // map resizer
  const MainScreenRef = useRef(null);
  const [mainScreenWidth, setMainScreenWidth] = useState('100%');
  useLayoutEffect(() => {
    gWebSocket.current = new WebSocket(webSocketAddress);
    gWebSocket.current.onopen = () => {
      // 첫 접속
      const socketData = JSON.stringify({
        method: 'INIT',
        categoryIdx,
        lng: locateValue.longitude,
        lat: locateValue.latitude,
        address: matchForm.address,
        detailAddress: matchForm.detailAddress,
        title: matchForm.title,
        content: matchForm.content,
        images: matchForm.images,
        price: matchForm.cost,
        viewDistance: '1',
      });
      console.log(socketData);
      console.log(gWebSocket.current);
      gWebSocket.current.send(socketData);
    };
    /**
     * 웹소켓 메시지(From Server) 수신하는 경우 호출
     */
    gWebSocket.current.onmessage = (message) => {
      const socketData = JSON.parse(message.data);
      console.log(socketData);
      if (socketData.method === 'GO_FACE_TIME') {
        setReservationIdx(socketData.data.reservationIdx);
        navigate('/videoservice');
      }
      setWatching(socketData.sellerCnt);
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
  useLayoutEffect(() => {
    const handleResize = () => {
      setMainScreenWidth(MainScreenRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [MainScreenRef]);

  const [distance, setDistance] = useState('1km 이내');

  const handleChange = (event) => {
    setDistance(event.target.value);
  };
  const changeDistance = (value) => {
    console.log(gWebSocket.current);
    const data = JSON.stringify({
      method: 'CHANGE_DISTANCE',
      viewDistance: value,
    });
    console.log(data);
    gWebSocket.current.send(data);
  };

  // eslint-disable-next-line react/jsx-one-expression-per-line
  const alertText = (
    <p>
      {`${Math.floor(counter / 60)}분 ${
        counter % 60
      }초 뒤, 이전 페이지로 돌아갑니다.`}
    </p>
  );

  const marker = (
    <div className="dot">
      <div className="centraldot" />
      <div className="wave" />
      <div className="wave2" />
    </div>
  );

  // map style
  const mapStyle = {
    width: mainScreenWidth,
    height: '100%',
  };

  // 지도를 담을 영역의 DOM 레퍼런스
  const container = useRef();

  useEffect(() => {
    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      // 지도의 중심좌표.
      center: new kakao.maps.LatLng(
        locateValue.latitude,
        locateValue.longitude,
      ),
      level: 4, // 지도의 레벨(확대, 축소 정도)
    };

    // 지도 생성 및 객체 리턴
    // eslint-disable-next-line no-unused-vars
    const map = new kakao.maps.Map(container.current, options);
  });

  return (
    <Main ref={MainScreenRef}>
      <MapBox>
        <ArrowBox>
          <BackArrow style={{ fontSize: '120%' }} onClick={routeMatchForm} />
        </ArrowBox>
        <AlertBox>{alertText}</AlertBox>
        <MarkerBox>{marker}</MarkerBox>
        <Map ref={container} style={mapStyle} />
        <UpperMap />
      </MapBox>
      <InfoBox>
        <UpperInfo>
          <span>자동결제 적용</span>
          <FormControl size="small" variant="standard" sx={{ minWidth: 80 }}>
            <Select
              id="distance-selector"
              value={distance}
              onChange={handleChange}
              label="distance"
              sx={{ fontSize: 12 }}
            >
              <MenuItem
                sx={{ fontSize: 12 }}
                value="거리무관"
                onClick={() => changeDistance('-1')}
              >
                거리무관
              </MenuItem>
              <MenuItem
                sx={{ fontSize: 12 }}
                value="1km 이내"
                onClick={() => changeDistance('1')}
              >
                1km 이내
              </MenuItem>
              <MenuItem
                sx={{ fontSize: 12 }}
                value="5km 이내"
                onClick={() => changeDistance('5')}
              >
                5km 이내
              </MenuItem>
              <MenuItem
                sx={{ fontSize: 12 }}
                value="10km 이내"
                onClick={() => changeDistance('10')}
              >
                10km 이내
              </MenuItem>
            </Select>
          </FormControl>
        </UpperInfo>
        <LowerInfo>
          {watching !== 0 ? (
            <p>{`지금 ${watching}명의 전문가가\n고객님의 문의를 보고 있습니다.`}</p>
          ) : (
            <p>현재 대기중인 전문가가 없습니다.</p>
          )}
        </LowerInfo>
      </InfoBox>
    </Main>
  );
}
const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const MapBox = styled.div`
  position: relative;
  z-index: 10;
  height: calc(100% - 160px);
`;

const ArrowBox = styled.div`
  position: absolute;
  z-index: 20;
`;

const BackArrow = styled(ChevronLeftIcon)`
  color: #ffffff;
  cursor: pointer;
`;

const AlertBox = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 20;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme.color.defaultWhite};
  }
`;

const MarkerBox = styled.div`
  position: absolute;
  z-index: 19;
  width: 100%;
  // height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Map = styled.div`
  position: absolute;
`;

const UpperMap = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const InfoBox = styled.div`
  width: 100%;
  height: 160px;
  z-index: 20;
  padding: 16px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;

const UpperInfo = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => props.theme.color.defaultBlue};
  }

  span:last-child {
    color: ${(props) => props.theme.color.defaultMeddleColor};
  }
`;

const LowerInfo = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 16px;
    font-weight: bold;
    white-space: pre-line;
    line-height: 32px;
    margin-bottom: 16px;
  }
`;
