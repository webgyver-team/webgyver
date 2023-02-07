/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LimHS from '../../../assets/image/LimHS.png';
import Background from '../../../assets/image/MasterBackground.jpg';
import Info from './elements/Info';
import TimePicker from './elements/TimePicker';

export default function Mypage() {
  const navigate = useNavigate();
  const [businessHoursOpen, setBusinessHoursOpen] = useState(false);
  const onChangeBusinessHoursOpen = () => {
    setBusinessHoursOpen(!businessHoursOpen);
  };
  // eslint-disable-next-line prettier/prettier
  const content = '안녕하세요 저는 수리 Ssaf 고수 Shop을 운영하고 있는 임희상입니다. \n\n ☆ 1주년 기념 상담료 무료!!!\n ☆ 웹가이버 1년간 평점 5점 유일 매장! \n\n 저희 업체는 하수도! 욕실! 주방! 보일러! 전기! 조명! 유리! 문! 창호! 가리지 않고 전부 다 수리 가능한 만능 수리점입니다.\n\n 과다 정비 절대 사양합니다. \n 고객님의 재산 저의 것이라고  \n 리모델링도 가능합니다. \n 문의 넣어주시면 감사하겠습니다.';

  // 업체소개 수정 팝업
  const [openInfo, setOpenInfo] = useState(false);

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  // 영업시간 수정 팝업
  const [openTime, setOpenTime] = useState(false);

  const handleClickOpenTime = () => {
    setOpenTime(true);
  };

  const [businessHour, setBusinessHour] = useState([
    { day: '월요일', open: '09:00', close: '18:00', isHoliday: false },
    { day: '화요일', open: '09:00', close: '18:00', isHoliday: false },
    { day: '수요일', open: '09:00', close: '18:00', isHoliday: false },
    { day: '목요일', open: '09:00', close: '18:00', isHoliday: false },
    { day: '금요일', open: '09:00', close: '18:00', isHoliday: false },
    { day: '토요일', open: '09:00', close: '18:00', isHoliday: false },
    { day: '일요일', open: '09:00', close: '18:00', isHoliday: false },
    { day: '공휴일', open: '09:00', close: '18:00', isHoliday: true },
  ]);
  const routeMyPageUpdate = () => {
    navigate('/master/mypage/update');
  };

  return (
    <Main>
      <Info open={openInfo} setOpen={setOpenInfo} info={content} />
      <TimePicker
        open={openTime}
        setOpen={setOpenTime}
        hour={businessHour}
        setHour={setBusinessHour}
      />
      <div>
        <BtnBox>
          <StateBtn>
            <span>환전하기</span>
          </StateBtn>
          <Money>₩ 1,000원</Money>
        </BtnBox>
      </div>
      <MasterInfoBox>
        <EditBox2>
          <MoreBtn2 onClick={routeMyPageUpdate}>개인정보 수정</MoreBtn2>
        </EditBox2>
        <MasterImgBox>
          <img src={LimHS} alt="마스터얼굴" />
        </MasterImgBox>
        <InfoBox>
          <InfoTextBox>
            <p>수리SsaF고수Shop</p>
            <p>임희상</p>
            <p>대전 유성구 덕명동 124</p>
          </InfoTextBox>
        </InfoBox>
      </MasterInfoBox>
      <CountBox>
        <div>
          <span>5.0</span>
          <span>점</span>
          <p>평점</p>
        </div>
        <VerticalBar />
        <div>
          <span>1,000</span>
          <span>개</span>
          <p>전체 후기 수</p>
        </div>
      </CountBox>
      <IntrduceoBox>{content}</IntrduceoBox>
      <EditBox>
        <MoreBtn onClick={handleClickOpenInfo}>수정하기</MoreBtn>
      </EditBox>
      <DetailBox>
        <div>
          <DetailTitle>대표자명</DetailTitle>
          <DetailContent>임희상</DetailContent>
        </div>
        <div>
          <DetailTitle>상호명</DetailTitle>
          <DetailContent>수리SsaF고수Shop</DetailContent>
        </div>
        <div>
          <DetailTitle>사업자주소</DetailTitle>
          <DetailContent>대전 유성구 덕명동 124</DetailContent>
        </div>
        <div>
          <DetailTitle>사업자등록번호</DetailTitle>
          <DetailContent>123-45-67890</DetailContent>
        </div>
        <BusinessBox>
          <DetailTitle>영업시간</DetailTitle>
          <MoreBtn onClick={onChangeBusinessHoursOpen}>
            {businessHoursOpen ? '접기' : '더보기'}
          </MoreBtn>
        </BusinessBox>
        {businessHoursOpen && (
          <BusinessHoursBox>
            {businessHour.map((el, i) => (
              <div key={`hour-${i}`}>
                <DetailTitle key={`title-${i}`}>{el.day}</DetailTitle>
                <DetailContent key={`content-${i}`}>
                  {`${el.open} - ${el.close}`}
                </DetailContent>
              </div>
            ))}
            <EditBox>
              <MoreBtn onClick={handleClickOpenTime}>수정하기</MoreBtn>
            </EditBox>
          </BusinessHoursBox>
        )}
        <BusinessBox>
          <DetailTitle>카테고리</DetailTitle>
        </BusinessBox>
        <BusinessHoursBox>
          <div>
            <DetailTitle>주방</DetailTitle>
            <DetailContent>3,000원</DetailContent>
          </div>
        </BusinessHoursBox>
      </DetailBox>
      <NullBox />
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  max-width: 768px;
  position: relative;
`;

const BtnBox = styled.div`
  width: auto;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 8px;
`;

const StateBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  padding: 0 16px 0 16px;
  height: 40px;
  width: 120px;
  box-shadow: 1px 1px 4px 0px ${(props) => props.theme.color.dafaultBorder};
  background-color: ${(props) => props.theme.color.defaultBgColor};

  :hover {
    cursor: pointer;
    // background-color: ${(props) => props.theme.color.dafaultBorder};
  }
`;

const Money = styled.span`
  font-size: 16px;
  margin: 8px;
`;

const MasterInfoBox = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 80px 1fr;
  height: 152px;
  padding: 16px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${Background});
  background-size: cover;
  background-position center center;
`;

const MasterImgBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 70%;
  overflow: hidden;
  border: 2px solid ${(props) => props.theme.color.defaultWhite};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
`;

const InfoTextBox = styled.div`
  margin-left: 16px;
  font-size: 14px;
  color: ${(props) => props.theme.color.defaultWhite};

  p {
    :first-child {
      padding-top: 4px;
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

const CountBox = styled.div`
  height: 80px;
  margin: 8px 0 8px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  div {
    span {
      :first-child {
        font-size: 24px;
      }
      :nth-child(2) {
        font-size: 14px;
      }
    }
    p {
      position: relative;
      top: -4px;
      text-align: center;
      font-size: 12px;
      color: ${(props) => props.theme.color.defaultBlue};
    }
  }
`;

const VerticalBar = styled.div`
  width: 1px;
  height: 48px;
  background-color: ${(props) => props.theme.color.dafaultBorder};
`;

const IntrduceoBox = styled.div`
  padding: 8px;
  font-size: 14px;
  white-space: pre-line;
  line-height: 24px;
`;

const DetailBox = styled.div`
  padding: 8px;
  line-height: 16px;
`;

const DetailTitle = styled.span`
  margin-right: 8px;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.color.defaultMeddleColor};
`;

const DetailContent = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.color.defaultlightColor};
`;

const MoreBtn = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.color.defaultlightColor};
  cursor: pointer;
`;

const BusinessBox = styled.div`
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BusinessHoursBox = styled.div`
  padding-left: 8px;
`;

const EditBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 8px;
  width: 100%;
`;

const EditBox2 = styled(EditBox)`
  top: 20px;
  right: 20px;
`;

const MoreBtn2 = styled(MoreBtn)`
  color: ${(props) => props.theme.color.defaultWhite};
`;

const NullBox = styled.div`
  height: 80px;
`;
