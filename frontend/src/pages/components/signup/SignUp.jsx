import React from 'react';
import styled from 'styled-components';
import IdInput from './elements/IdInput';
import PasswordInput from './elements/PasswordInput';
import NameInput from './elements/NameInput';
import ResidentNumberInput from './elements/ResidentNumberInput';
import PhoneNumberInput from './elements/PhoneNumberInput';

export default function SignUp() {
  // const [data, setData] = useState({
  //     id: '',
  //     password: '',
  //     name: '',
  //     residentNumber: '',
  //     cellphoneNumber: '',
  //     cardNumber: '',
  // });
  return (
    <div>
      <SignUpTitle>고객 회원가입</SignUpTitle>
      {/* 글씨 크기 32로 조정 필요 */}
      <SignUpForm>
        <IdInput />
        <PasswordInput />
        <NameInput />
        <ResidentNumberInput />
        <PhoneNumberInput />
        <div>카드번호</div>
      </SignUpForm>
      <button type="button">회원가입</button>
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
  border: 1px solid black;
`;
