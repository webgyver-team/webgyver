import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

export default function Info(props) {
  const [businessHoursOpen, setBusinessHoursOpen] = useState(false);
  const onChangeBusinessHoursOpen = () => {
    setBusinessHoursOpen(!businessHoursOpen);
  };
  const [data, setData] = useState(props);
  useLayoutEffect(() => {
    setData(props);
  }, [props]);
  console.log(data);
  // eslint-disable-next-line
  // const content = '안녕하세요 저는 수리 Ssaf 고수 Shop을 운영하고 있는 임희상입니다. \n\n ☆ 1주년 기념 상담료 무료!!!\n ☆ 웹가이버 1년간 평점 5점 유일 매장! \n\n 저희 업체는 하수도! 욕실! 주방! 보일러! 전기! 조명! 유리! 문! 창호! 가리지 않고 전부 다 수리 가능한 만능 수리점입니다.\n\n 과다 정비 절대 사양합니다. \n 고객님의 재산 저의 것이라고  \n 리모델링도 가능합니다. \n 문의 넣어주시면 감사하겠습니다.';
  return (
    <Main>
      {data.props === null ? null : (
        <>
          <MasterInfoBox Background={data.props.backgroundImage}>
            <MasterImgBox>
              <img
                src={`https://webgyver.s3.ap-northeast-2.amazonaws.com/${data.props.profileImage}`}
                alt="프로필이미지"
              />
            </MasterImgBox>
            <InfoBox>
              <InfoTextBox>
                <p>{data.props.companyName}</p>
                <p>{data.props.userName}</p>
                <p>{`${data.props.address} ${data.props.detailAddress}`}</p>
              </InfoTextBox>
            </InfoBox>
          </MasterInfoBox>
          <CountBox>
            <div>
              <span>{data.props.ratingAvg}</span>
              <span>점</span>
              <p>평점</p>
            </div>
            <VerticalBar />
            <div>
              <span>{data.props.reviewCnt}</span>
              <span>개</span>
              <p>전체 후기 수</p>
            </div>
          </CountBox>
          {/* <IntrduceoBox>{content}</IntrduceoBox> */}
          <IntrduceoBox>{data.props.companyDescription}</IntrduceoBox>
          <DetailBox>
            <div>
              <DetailTitle>상호명</DetailTitle>
              <DetailContent>{data.props.companyName}</DetailContent>
            </div>
            <div>
              <DetailTitle>대표자명</DetailTitle>
              <DetailContent>{data.props.partnerName}</DetailContent>
            </div>
            <div>
              <DetailTitle>사업자주소</DetailTitle>
              <DetailContent>{`${data.props.address} ${data.props.detailAddress}`}</DetailContent>
            </div>
            <div>
              <DetailTitle>사업자등록번호</DetailTitle>
              <DetailContent>
                {`${data.props.companyNumber.slice(
                  0,
                  3,
                )}-${data.props.companyNumber.slice(
                  3,
                  5,
                )}-${data.props.companyNumber.slice(5, 11)}`}
              </DetailContent>
            </div>
            <BusinessBox>
              <DetailTitle>영업시간</DetailTitle>
              <MoreBtn onClick={onChangeBusinessHoursOpen}>더보기</MoreBtn>
            </BusinessBox>
            {businessHoursOpen && (
              <BusinessHoursBox>
                {data.props.companyTime === null ? (
                  <DetailContent>
                    영업 시간이 등록되지 않았습니다.
                  </DetailContent>
                ) : (
                  data.props.companyTime.map((time) => (
                    <div key={time.day}>
                      <DetailTitle>{time.day}</DetailTitle>
                      <DetailContent>
                        {time.holiday === true
                          ? '휴무'
                          : `${time.open} ~ ${time.close}`}
                      </DetailContent>
                    </div>
                  ))
                )}
              </BusinessHoursBox>
            )}
          </DetailBox>
        </>
      )}
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

const MasterInfoBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 80px 1fr;
  height: 152px;
  padding: 16px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.backgroundImage});
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
    text-align: center;
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
