import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import NameInput from '../signup/elements/NameInput';
import ResidentNumberInput from '../signup/elements/ResidentNumberInput';
import PhoneNumberInput from '../signup/elements/PhoneNumberInput';

export default function MyPageUpdate() {
  // const [cardNumber, setCardNumber] = useState(null);
  const userInfo = {
    // 받아온 유저 정보
    idx: '0',
    name: '임시이름',
    birthday: '0000001',
    phoneNumber: '01000000000',
    // cardNumber: null,
  };
  const [data, setData] = useState({
    idx: userInfo.idx,
    name: userInfo.name,
    birthday: userInfo.birthday,
    phoneNumber: userInfo.phoneNumber,
    // cardNumber,
  });
  const updateData = (updateValue) => {
    setData((original) => ({
      ...original,
      ...updateValue,
    }));
  };

  const registCard = () => {
    // eslint-disable-next-line
    alert('카드 등록 API 호출 예정..');
  };

  const registCustomer = () => {
    // eslint-disable-next-line
    console.log(data);
  };
  return (
    <div
      style={{
        width: '100%',
        padding: '16px',
        margin: '0px auto',
      }}
    >
      <SignUpTitle>회원정보 수정</SignUpTitle>
      {/* {data.cardNumber} */}
      {/* 글씨 크기 32로 조정 필요 */}
      <SignUpForm>
        <NameInput updateData={updateData} initialValue={data.name} />
        <ResidentNumberInput
          updateData={updateData}
          initialValue1={
            data.birthday !== null ? data.birthday.slice(0, 6) : null
          }
          initialValue2={
            data.birthday !== null ? `${data.birthday.slice(6, 7)}******` : null
          }
        />
        <PhoneNumberInput
          updateData={updateData}
          initialValue1={
            data.phoneNumber !== null ? data.phoneNumber.slice(0, 3) : null
          }
          initialValue2={
            data.phoneNumber !== null ? data.phoneNumber.slice(3, 7) : null
          }
          initialValue3={
            data.phoneNumber !== null ? data.phoneNumber.slice(7, 11) : null
          }
        />
        <hr />
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>카드 등록</h2>
          <div style={{ textAlign: 'center' }}>
            <AddCardIcon
              onClick={registCard}
              sx={{
                fontSize: '80px',
                '&:hover': {
                  color: '#6A7EFC',
                  cursor: 'pointer',
                },
              }}
            />
          </div>
        </div>
      </SignUpForm>
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={registCustomer}>
          수정
        </Button>
      </div>
    </div>
  );
}

const SignUpTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;
const SignUpForm = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
