/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import NameInput from '../../common/signup/elements/NameInput';
import PasswordInput from '../../common/signup/elements/PasswordInput';
import ResidentNumberInput from '../../common/signup/elements/ResidentNumberInput';
import PhoneNumberInput from '../../common/signup/elements/PhoneNumberInput';
import CardNumberInput from '../signup/elements/CardNumberInput';
import { customer } from '../../../api/customerService';
import { userIdx } from '../../../atom';
import LoadingSpinner from '../../common/LoadingSpinner';

export default function MyPageUpdate() {
  const customerIdx = useRecoilValue(userIdx);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    const getMyProfile = async () => {
      const response = await customer.get.myInfo(customerIdx);
      setData({ ...response.data.customer, ...{ password: null } });
      // console.log(response.data.customer);
      setLoading(false);
    };
    getMyProfile();
  }, []);

  const updateData = (updateValue) => {
    setData((original) => ({
      ...original,
      ...updateValue,
    }));
  };

  const registCustomer = async () => {
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
    if (data.birthDay === null) {
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
    // eslint-disable-next-line
    if (data.cardNumber.trim().length !== 16) {
      // eslint-disable-next-line
      alert('카드정보를 입력하세요.');
      return;
    }
    // eslint-disable-next-line
    if (data.cardValidity.trim().length !== 4) {
      // eslint-disable-next-line
      alert('카드 유효기간을 입력하세요.');
      return;
    }
    // eslint-disable-next-line
    console.log(data);
    const response = await customer.put.profile(data, customerIdx);
    if (response.statusCode === 200) {
      // eslint-disable-next-line
      alert('회원정보가 수정되었습니다.');
      navigate('/mypage');
    } else {
      alert(response.message);
    }
  };
  return (
    <div
      style={{
        width: '100%',
        padding: '16px',
        margin: '0px auto',
      }}
    >
      {!loading ? (
        <div>
          <SignUpTitle>회원정보 수정</SignUpTitle>
          <SignUpForm>
            <NameInput
              updateData={updateData}
              initialValue={data.name !== '' ? data.name : '??'}
            />
            <PasswordInput updateData={updateData} />
            <ResidentNumberInput
              updateData={updateData}
              initialValue1={`${data.birthDay.slice(0, 6)}`}
              initialValue2={`${data.birthDay.slice(6, 7)}******`}
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
            <CardNumberInput
              updateData={updateData}
              initialValue1={data.cardNumber.slice(0, 4)}
              initialValue2={data.cardNumber.slice(4, 8)}
              initialValue3={data.cardNumber.slice(8, 12)}
              initialValue4={data.cardNumber.slice(12, 16)}
              initialValueMM={data.cardValidity.slice(0, 2)}
              initialValueYY={data.cardValidity.slice(2, 4)}
            />
          </SignUpForm>
          <div style={{ textAlign: 'center' }}>
            <Button variant="contained" onClick={registCustomer}>
              수정
            </Button>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
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
