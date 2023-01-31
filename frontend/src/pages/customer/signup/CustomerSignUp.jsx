import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import IdInput from './elements/IdInput';
import PasswordInput from './elements/PasswordInput';
import NameInput from './elements/NameInput';
import ResidentNumberInput from './elements/ResidentNumberInput';
import PhoneNumberInput from './elements/PhoneNumberInput';
import Agreement from './elements/AgreementToTerms';

export default function CustomerSignUp() {
  // const [cardNumber, setCardNumber] = useState(null);
  const [data, setData] = useState({
    id: null,
    password: null,
    birthday: null,
    name: null,
    phoneNumber: null,
    // cardNumber,
    useCheck: false,
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
    <div>
      <SignUpTitle>고객 회원가입</SignUpTitle>
      {/* {data.cardNumber} */}
      {/* 글씨 크기 32로 조정 필요 */}
      <SignUpForm>
        <IdInput updateData={updateData} />
        <PasswordInput updateData={updateData} />
        <NameInput updateData={updateData} />
        <ResidentNumberInput updateData={updateData} />
        <PhoneNumberInput updateData={updateData} />
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
        <Agreement updateData={updateData} />
      </SignUpForm>
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={registCustomer}>
          회원가입
        </Button>
      </div>
    </div>
  );
}

const SignUpTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;
const SignUpForm = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 80vw;
`;
