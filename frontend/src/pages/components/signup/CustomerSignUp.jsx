import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
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

  const registCard = () => {
    alert('카드 등록 API 호출..');
  };
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
      <Button variant="contained">회원가입</Button>
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
