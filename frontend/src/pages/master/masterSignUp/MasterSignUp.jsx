import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IdInput from '../../common/signup/elements/IdInput';
import PasswordInput from '../../common/signup/elements/PasswordInput';
import NameInput from '../../common/signup/elements/NameInput';
import ResidentNumberInput from '../../common/signup/elements/ResidentNumberInput';
import PhoneNumberInput from '../../common/signup/elements/PhoneNumberInput';
import Agreement from '../../common/signup/elements/AgreementToTerms';
import AddressInput from './elements/AddressInput';
import BusinessNameInput from './elements/BusinessNameInput';
import RepresentativeNameInput from './elements/RepresentativeNameInput';
import BusinessRegistrationNumberInput from './elements/BusinessRegistrationNumberInput';
import CategoryInput from './elements/CategoryInput';

export default function MasterSignUp() {
  const [data, setData] = useState({
    id: null,
    password: null,
    name: null,
    residentNumber: null,
    phoneNumber: null,
    useCheck: false,
    businessName: null,
    representativeName: null,
    businessRegistrationNumber: null,
    addressInput: null,
    categoryList: [],
  });

  const updateData = (updateValue) => {
    setData((original) => ({
      ...original,
      ...updateValue,
    }));
  };

  const registCustomer = () => {
    // eslint-disable-next-line
    console.log(data);
  };
  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <SignUpTitle>마스터 회원가입</SignUpTitle>
      <SignUpForm>
        <FormDiv>
          <FormTitle>회원 정보 입력</FormTitle>
          <IdInput updateData={updateData} />
          <PasswordInput updateData={updateData} />
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
  margin: 0px auto;
  justify-content: space-between;
  border: 2px solid teal;
  padding: 16px;
  max-width: 1200px;
`;
const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
`;
const FormDiv = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 48%;
  max-width: 540px;
  border: 2px solid teal;
`;
