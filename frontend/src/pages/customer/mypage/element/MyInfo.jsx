import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { customer } from '../../../../api/customerService';
import { userIdx } from '../../../../atom';

export default function MyInfo() {
  const customerIdx = useRecoilValue(userIdx);
  const [myInfo, setMyInfo] = useState({
    name: '',
    phoneNumber: '',
    birth: '',
    cardNumber: '',
  });
  useEffect(() => {
    const getMyInfo = async () => {
      const response = await customer.get.myInfo(customerIdx);
      if (response.statusCode === 200) {
        setMyInfo(response.data.customer);
      } else {
        // eslint-disable-next-line
        alert(response.message);
      }
    };
    getMyInfo();
  }, [customerIdx]);
  return (
    <Main>
      <InfoBox>
        <div>
          <span className="first">이름</span>
          <span className="last">{myInfo.name}</span>
        </div>
        <NullBox />
        <div>
          <span className="first">전화번호</span>
          <span className="last">
            {`${myInfo.phoneNumber.slice(0, 3)}-${myInfo.phoneNumber.slice(
              3,
              7,
            )}-${myInfo.phoneNumber.slice(7, 11)}`}
          </span>
        </div>
        <NullBox />
        <div>
          <span className="first">생년월일</span>
          <span className="last">
            {`${myInfo.birth.split(' ')[0].split('-')[0]}년 ${
              myInfo.birth.split(' ')[0].split('-')[1]
            }월 ${myInfo.birth.split(' ')[0].split('-')[2]}일`}
          </span>
        </div>
        <NullBox />
        <div>
          <span className="first">카드정보</span>
          <span className="last">
            {`${myInfo.cardNumber.slice(0, 4)}-${myInfo.cardNumber.slice(
              4,
              8,
            )}-${myInfo.cardNumber.slice(8, 12)}-${myInfo.cardNumber.slice(
              12,
              16,
            )}`}
          </span>
        </div>
      </InfoBox>
      <BtnBox>
        <Btn>수정하기</Btn>
      </BtnBox>
    </Main>
  );
}

const Main = styled.div`
  margin: 16px;
`;

const InfoBox = styled.div`
  font-size: 16px;
  padding: 16px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
  box-shadow: 2px 2px 4px 0px ${(props) => props.theme.color.dafaultBorder};

  .first {
    font-weight: bold;
  }

  .last {
    margin-left: 16px;
  }
`;

const NullBox = styled.div`
  height: 16px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const Btn = styled.div`
  font-size: 16px;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`;
