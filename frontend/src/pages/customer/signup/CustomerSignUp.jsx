import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from 'react-router-dom';
import IdInput from '../../common/signup/elements/IdInput';
import PasswordInput from '../../common/signup/elements/PasswordInput';
import NameInput from '../../common/signup/elements/NameInput';
import ResidentNumberInput from '../../common/signup/elements/ResidentNumberInput';
import PhoneNumberInput from '../../common/signup/elements/PhoneNumberInput';
import Agreement from '../../common/signup/elements/AgreementToTerms';
import { customer } from '../../../api/accountsApi';

export default function CustomerSignUp() {
  // const [cardNumber, setCardNumber] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: null,
    password: null,
    birthDay: null,
    name: null,
    phoneNumber: null,
    cardNumber: '1111222233334444',
    cardCvc: '123',
    cardValidity: '0526',
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
    if (data.id === null) {
      // eslint-disable-next-line
      alert('아이디를 입력한 후 중복 검사를 하세요.');
      return;
    }
    // 비밀번호 -> 비밀번호 확인을 거친 비밀번호여야 인정됨, 그 전엔 null
    if (data.password === null) {
      // eslint-disable-next-line
      alert('비밀번호 및 비밀번호 확인을 입력하세요.');
      return;
    }
    // 이름 -> 한 글자 이상이면 ok, 아니면 null
    if (data.name === null) {
      // eslint-disable-next-line
      alert('이름을 입력하세요.');
      return;
    }
    if (data.birthday === null) {
      // eslint-disable-next-line
      alert('주민등록번호 앞 7자리를 입력하세요.');
      return;
    }
    // 전화번호 11자리 -> 제대로 입력되어야 반영됨, 아니면 null
    if (data.phoneNumber === null) {
      // eslint-disable-next-line
      alert('전화번호를 입력하세요.');
      return;
    }
    if (data.useCheck === false) {
      // eslint-disable-next-line
      alert('이용약관 동의는 필수입니다.');
      return;
      // 다 통과되면 해당 property 빼야 함
    }
    // eslint-disable-next-line
    if (data.cardNumber === null) {
      // eslint-disable-next-line
      alert('카드정보를 입력하세요.');
      return;
    }
    // eslint-disable-next-line
    delete data.useCheck;
    // 회원가입 POST
    customer
      .signup(data)
      .then((res) => {
        // eslint-disable-next-line
        console.log(res);
        if (res.status === 200) {
          // eslint-disable-next-line
          alert('회원가입이 완료되었습니다.');
          navigate('/');
        } else {
          // eslint-disable-next-line
          alert('다시 시도해주세요.');
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
  };
  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <SignUpTitle>고객 회원가입</SignUpTitle>
      <SignUpForm>
        <IdInput
          updateData={updateData}
          initialValue=""
          checkDuplicate={customer.checkDuplicate}
        />
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
