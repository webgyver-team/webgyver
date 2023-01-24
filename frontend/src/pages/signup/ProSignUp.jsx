import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IdInput from './elements/IdInput';
import PasswordInput from './elements/PasswordInput';
import NameInput from './elements/NameInput';
import ResidentNumberInput from './elements/ResidentNumberInput';
import PhoneNumberInput from './elements/PhoneNumberInput';
import Agreement from './elements/AgreementToTerms';
import BusinessNameInput from './elements/BusinessNameInput';
import RepresentativeNameInput from './elements/RepresentativeNameInput';
import BusinessRegistrationNumberInput from './elements/BusinessRegistrationNumberInput';
import AddressInput from './elements/AddressInput';
import CategoryInput from './elements/CategoryInput';

export default function CustomerSignUp() {
  // const [cardNumber, setCardNumber] = useState(null);
  const [data, setData] = useState({
    id: null,
    password: null,
    name: null,
    residentNumber: null,
    phoneNumber: null,
    useCheck: false,
    businessName: null,
    representativeName: null,
    BusinessRegistrationNumber: null,
    AddressInput: null,
  });

  const updateData = (updateValue) => {
    setData((original) => ({
      ...original,
      ...updateValue,
    }));
  };

  const registCustomer = () => {
    console.log(data);
  };
  return (
    <div>
      <SignUpTitle>전문가 회원가입</SignUpTitle>
      {/* {data.cardNumber} */}
      {/* 글씨 크기 32로 조정 필요 */}
      <SignUpForm>
        <FormDiv>
          <FormTitle>회원 정보 입력</FormTitle>
          <IdInput updateData={updateData} />
          <PasswordInput updateData={updateData} />
          <NameInput updateData={updateData} />
          <ResidentNumberInput updateData={updateData} />
          <PhoneNumberInput updateData={updateData} />
          <Agreement updateData={updateData} />
        </FormDiv>
        <FormDiv>
          <FormTitle>사업 정보 입력</FormTitle>
          <BusinessNameInput updateData={updateData} />
          <RepresentativeNameInput updateData={updateData} />
          <BusinessRegistrationNumberInput updateData={updateData} />
          <AddressInput updateData={updateData} />
          <CategoryInput updateData={updateData} />
        </FormDiv>
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
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
`;
const FormDiv = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 40%;
`;
