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
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [residentNumber, setResidentNumber] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  // const [cardNumber, setCardNumber] = useState(null);
  const [data, setData] = useState({
    id,
    password,
    name,
    residentNumber,
    phoneNumber,
    // cardNumber
  });
  const updateData = (original, updateValue) => {
    setData(() => ({
      ...original,
      ...updateValue,
    }));
  };
  const getId = (value) => {
    setId(() => value);
    updateData(data, { id: value });
  };
  const getPassword = (value) => {
    setPassword(() => value);
    updateData(data, { password: value });
  };
  const getName = (value) => {
    setName(() => value);
    updateData(data, { name: value });
  };
  const getResidentNumber = (value) => {
    setResidentNumber(() => value);
    updateData(data, { residentNumber: value });
  };
  const getPhoneNumber = (value) => {
    setPhoneNumber(() => value);
    updateData(data, { phoneNumber: value });
  };
  const registCard = () => {
    alert('카드 등록 API 호출..');
  };
  return (
    <div>
      <SignUpTitle>고객 회원가입</SignUpTitle>

      {/* <div>{data.id}</div>
      <div>{data.password}</div>
      <div>{data.name}</div>
      <div>{data.residentNumber}</div>
      <div>{data.phoneNumber}</div> */}

      {/* {data.cardNumber} */}
      {/* 글씨 크기 32로 조정 필요 */}
      <SignUpForm>
        <IdInput getId={getId} />
        <PasswordInput getPassword={getPassword} />
        <NameInput getName={getName} />
        <ResidentNumberInput getResidentNumber={getResidentNumber} />
        <PhoneNumberInput getPhoneNumber={getPhoneNumber} />
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
        <Agreement />
      </SignUpForm>
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={() => alert('고객 회원가입 axios POST 예정')}
        >
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
  width: 90vw;
`;
