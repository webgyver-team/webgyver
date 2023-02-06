import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import IdInput from '../../common/signup/elements/IdInput';
import PasswordInput from '../../common/signup/elements/PasswordInput';
import NameInput from '../../common/signup/elements/NameInput';
import ResidentNumberInput from '../../common/signup/elements/ResidentNumberInput';
import PhoneNumberInput from '../../common/signup/elements/PhoneNumberInput';
import Agreement from '../../common/signup/elements/AgreementToTerms';

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
    <div style={{ width: '100%', padding: '16px' }}>
      <SignUpTitle>고객 회원가입</SignUpTitle>
      <SignUpForm>
        <IdInput updateData={updateData} initialValue="" />
        <PasswordInput updateData={updateData} initialValue="" />
        <NameInput updateData={updateData} initialValue="" />
        <ResidentNumberInput
          updateData={updateData}
          initialValue1=""
          initialValue2="******"
        />
        <PhoneNumberInput
          updateData={updateData}
          initialValue1=""
          initialValue2=""
          initialValue3=""
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
        <Agreement updateData={updateData} />
      </SignUpForm>
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={registCustomer}>
          가입
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
