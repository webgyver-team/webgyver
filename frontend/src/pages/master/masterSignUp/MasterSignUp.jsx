import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { locateValueState } from '../../../atom';
import IdInput from '../../common/signup/elements/IdInput';
import PasswordInput from '../../common/signup/elements/PasswordInput';
import NameInput from '../../common/signup/elements/NameInput';
import ResidentNumberInput from '../../common/signup/elements/ResidentNumberInput';
import PhoneNumberInput from '../../common/signup/elements/PhoneNumberInput';
import Agreement from '../../common/signup/elements/AgreementToTerms';
import AddressInput from './elements/AddressInput';
import CompanyNameInput from './elements/CompanyNameInput';
import RepresentativeNameInput from './elements/RepresentativeNameInput';
import CompanyNumberInput from './elements/CompanyNumberInput';
import CategoryInput from './elements/CategoryInput';

export default function MasterSignUp() {
  const location = useRecoilValue(locateValueState);
  const defaultCategoryList = [
    {
      index: 0, // categoryItemList에서의 순서(key에 사용)
      category: { idx: 0, categoryName: 'None' },
      price: '', // 헤당 카테고리 가격
    }, // 기본 카테고리 리스트
  ];
  const [data, setData] = useState({
    id: null,
    password: null,
    name: null,
    birthday: null,
    phoneNumber: null,
    useCheck: false,
    companyName: null,
    representativeName: null,
    businessRegistrationNumber: null,
    address: location.address,
    detailAddress: location.detail,
    categoryList: defaultCategoryList,
  });
  const updateData = (updateValue) => {
    setData((original) => ({
      ...original,
      ...updateValue,
    }));
  };

  const registCustomer = () => {
    // 각 입력정보 모아져 있는 data를 가지고 유효성 검사하자
    // 아이디 -> 글자수 제한 충족시킨 후 중복 검사 거쳐야 값 O, 그 전엔 null

    if (data.id === null) {
      // eslint-disable-next-line
      alert('아이디를 입력하세요.');
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
    // 주민등록번호 7자리 -> 제대로 반영되어야 반영됨, 아니면 null
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
    if (data.companyName === null) {
      // eslint-disable-next-line
      alert('상호명을 입력하세요.');
      return;
    }
    if (data.representativeName === null) {
      // eslint-disable-next-line
      alert('대표자명을 입력하세요.');
      return;
    }
    if (data.companyNumber === null) {
      // eslint-disable-next-line
      alert('사업자 등록번호를 입력하고 검사하세요.');
      return;
    }
    if (data.address === null || data.detail === null) {
      // eslint-disable-next-line
      alert('주소를 입력하세요.');
      return;
    }
    // 카테고리 리스트: 카테고리 idx가 0인 경우
    for (let i = 0; i < data.categoryList.length; i += 1) {
      if (data.categoryList[i].category.idx === 0) {
        // eslint-disable-next-line
        alert('유효하지 않은 카테고리가 있습니다.');
        return;
      }
    }
    // eslint-disable-next-line
    // api 호출 추가 예정
    console.log(data);
  };
  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <SignUpTitle>마스터 회원가입</SignUpTitle>
      <SignUpForm>
        <FormDiv>
          <FormTitle>회원 정보 입력</FormTitle>
          <IdInput updateData={updateData} initialValue="" />
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
          <CompanyNameInput updateData={updateData} initialValue="" />
          <RepresentativeNameInput updateData={updateData} initialValue="" />
          <CompanyNumberInput
            updateData={updateData}
            initialValue1=""
            initialValue2=""
            initialValue3=""
          />
          <AddressInput updateData={updateData} />
          <CategoryInput
            updateData={updateData}
            initialList={defaultCategoryList}
          />
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
  padding: 16px;
  max-width: 1200px;
`;
const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;
const FormDiv = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 48%;
  max-width: 540px;
`;
