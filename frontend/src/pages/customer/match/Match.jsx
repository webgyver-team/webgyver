import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { locateValueState } from '../../../atom';
import './Match.scss';

// kakao 가져오기
const { kakao } = window;

// map style
const mapStyle = {
  width: '100%',
  height: '500px',
};

export default function Matching() {
  const navigate = useNavigate();
  const routeMatchForm = () => navigate('/match/form');
  const locateValue = useRecoilValue(locateValueState);

  const backCount = 3;
  // eslint-disable-next-line react/jsx-one-expression-per-line
  const alertText = <p>{backCount}분 뒤, 이전 페이지로 돌아갑니다.</p>;
  const lowerText = '지금 9명의 전문가가\n고객님의 문의를 보고 있습니다.';

  const marker = (
    <div className="dot">
      <div className="centraldot" />
      <div className="wave" />
      <div className="wave2" />
    </div>
  );

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
    <Main>
      <MapBox>
        <ArrowBox>
          <BackArrow style={{ fontSize: '120%' }} onClick={routeMatchForm} />
        </ArrowBox>
        <AlertBox>{alertText}</AlertBox>
        <MarkerBox>{marker}</MarkerBox>
        <InfoBox>
          <UpperInfo>
            <span>자동결제 적용</span>
            <span>1.0km 이내</span>
          </UpperInfo>
          <LowerInfo>
            <p>{lowerText}</p>
          </LowerInfo>
        </InfoBox>
        <Map ref={container} style={mapStyle} />
        <UpperMap />
      </MapBox>
      <NullBox />
    </Main>
  );
}

const Main = styled.div`
  position: relative;
  width: 100%;
`;

const MapBox = styled.div`
  position: relative;
  z-index: 10;
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
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Map = styled.div`
  position: absolute;
`;

const UpperMap = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const InfoBox = styled.div`
  position: absolute;
  width: 100%;
  z-index: 20;
  padding: 16px;
  bottom: -150px;
  border-radius: 20px 20px 0 0;
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
  }
`;

const NullBox = styled.div`
  height: 150px;
`;
