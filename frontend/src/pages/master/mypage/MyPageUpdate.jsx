import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { sha256 } from 'js-sha256';
import AWS from 'aws-sdk';
import IdInput from '../../common/signup/elements/IdInput';
import PasswordInput from '../../common/signup/elements/PasswordInput';
import NameInput from '../../common/signup/elements/NameInput';
import PhoneNumberInput from '../../common/signup/elements/PhoneNumberInput';
import CompanyNameInput from '../masterSignUp/elements/CompanyNameInput';
import RepresentativeNameInput from '../masterSignUp/elements/RepresentativeNameInput';
import CompanyNumberInput from '../masterSignUp/elements/CompanyNumberInput';
import AddressInput from '../masterSignUp/elements/AddressInput';
import CategoryInput from '../masterSignUp/elements/CategoryInput';

export default function MyPageUpdate() {
  const givenData = {
    customerIdx: 100,
    profileImage:
      'data:image/png;base64,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',
    backgroundImage:
      'data:image/jpeg;base64,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',
    id: 'dbsghl123',
    name: '허윤회',
    phoneNumber: '01027529950',
    companyName: '웹가이버철물점',
    representativeName: '허윤회',
    companyNumber: '1234567890',
    address: '경기도 안양시 동편로 135',
    detailAddress: '410동 1001호',
    categoryList: [
      {
        index: 1,
        category: {
          idx: 3,
          categoryName: '전기/조명',
        },
        price: 2000,
      },
      {
        index: 2,
        category: {
          idx: 1,
          categoryName: '욕실',
        },
        price: 14000,
      },
    ],
  };
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  // eslint-disable-next-line
  const [data, setData] = useState({
    password: null,
    name: givenData.name,
    phoneNumber: givenData.phoneNumber,
    companyName: givenData.companyName,
    representativeName: givenData.representativeName,
    companyNumber: givenData.companyNumber,
    address: givenData.address,
    detailAddress: givenData.detailAddress,
    categoryList: givenData.categoryList,
    profileImage: givenData.profileImage,
    backgroundImage: givenData.backgroundImage,
  });
  const [newBackgroundImage, setNewBackgroundImage] = useState(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);

  const updateData = (updateValue) => {
    setData((original) => ({
      ...original,
      ...updateValue,
    }));
  };
  const changeProfileImage = (event) => {
    setNewProfileImage(event.target.files[0]);
  };
  useEffect(() => {
    if (newProfileImage !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(newProfileImage);

      reader.onload = () => {
        setProfileImagePreview({ newProfileImage, url: reader.result });
      };
    }
  }, [newProfileImage]);
  useEffect(() => {
    if (newBackgroundImage !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(newBackgroundImage);

      reader.onload = () => {
        setBackgroundImagePreview({ newBackgroundImage, url: reader.result });
      };
    }
  }, [newBackgroundImage]);

  const changeBackgroundImage = (event) => {
    setNewBackgroundImage(event.target.files[0]);
  };

  // 이미지 S3 전송 함수
  const sendImageToS3 = async (image, mode) => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    const originName = image.name;
    const date = new Date();
    const extensionName = `.${originName.split('.').pop()}`;
    const hashImageName = sha256(
      `${date.toString()}${givenData.customerIdx}${originName}`,
    );
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: process.env.REACT_APP_AWS_BUCKET,
        Key: hashImageName + extensionName, // 고유한 파일명(현재 날짜 + 유저아이디 + 파일명을 합쳐 해시값 생성)
        Body: image, // 파일 객체 자체를 보냄
      },
    });
    const promise = upload.promise();
    promise
      .then((res) => {
        // eslint-disable-next-line
        console.log(res.Location+"에 "+image+`를 ${hashImageName} 경로에 저장 완료`);
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
    const newData = {
      saveName: hashImageName + extensionName,
      originName,
    };
    if (mode === 1) {
      // 프로필 이미지
      updateData({ profileImage: newData.saveName });
    } else {
      // 배경 이미지
      updateData({ backgroundImage: newData.saveName });
    }
  };

  const updateMasterInfo = () => {
    // 모든 항목 유효성 검사
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
    // 프로필, 대표 이미지 새로 추가된 부분 S3에 보내줌 + 데이터 경로 setData
    if (newProfileImage !== null) {
      // S3 전송함수에 적용
      sendImageToS3(newProfileImage, 1);
    }
    if (newBackgroundImage !== null) {
      // S3 전송함수에 적용
      sendImageToS3(newBackgroundImage, 2);
    }
    // 데이터 POST
    // eslint-disable-next-line
    console.log(data);
  };
  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <Title>마스터 회원정보 수정</Title>
      <ImageForm>
        <ImageDiv>
          <label htmlFor="profile-image-input">
            <ProfileImage
              src={
                profileImagePreview === null
                  ? givenData.profileImage
                  : profileImagePreview.url
              }
              alt="#"
            />
          </label>
          <ImageLabel>프로필 이미지</ImageLabel>
          <input
            type="file"
            id="profile-image-input"
            accept="image/*"
            onChange={changeProfileImage}
            style={{ display: 'none' }}
          />
        </ImageDiv>
        <ImageDiv>
          <label htmlFor="background-image-input">
            <RepresentImage
              src={
                backgroundImagePreview === null
                  ? givenData.backgroundImage
                  : backgroundImagePreview.url
              }
              alt="#"
            />
          </label>
          <ImageLabel>대표 이미지</ImageLabel>
          <input
            type="file"
            id="background-image-input"
            accept="image/*"
            onChange={changeBackgroundImage}
            style={{ display: 'none' }}
          />
        </ImageDiv>
      </ImageForm>
      <UpdateForm>
        <FormDiv>
          <IdInput updateData={updateData} initialValue={givenData.id} />
          <PasswordInput updateData={updateData} />
          <NameInput updateDate={updateData} initialValue={givenData.name} />
          <PhoneNumberInput
            updateData={updateData}
            initialValue1={
              givenData.phoneNumber !== null
                ? givenData.phoneNumber.slice(0, 3)
                : null
            }
            initialValue2={
              givenData.phoneNumber !== null
                ? givenData.phoneNumber.slice(3, 7)
                : null
            }
            initialValue3={
              givenData.phoneNumber !== null
                ? givenData.phoneNumber.slice(7, 11)
                : null
            }
          />
        </FormDiv>
        <FormDiv>
          <CompanyNameInput
            updateData={updateData}
            initialValue={givenData.companyName}
          />
          <RepresentativeNameInput
            updateData={updateData}
            initialValue={givenData.representativeName}
          />
          <CompanyNumberInput
            updateData={updateData}
            i
            initialValue1={
              givenData.companyNumber !== null
                ? givenData.companyNumber.slice(0, 3)
                : null
            }
            initialValue2={
              givenData.companyNumber !== null
                ? givenData.companyNumber.slice(3, 5)
                : null
            }
            initialValue3={
              givenData.companyNumber !== null
                ? givenData.companyNumber.slice(5, 11)
                : null
            }
          />
          <AddressInput updateData={updateData} />
          <CategoryInput
            updateData={updateData}
            initialList={givenData.categoryList}
          />
        </FormDiv>
      </UpdateForm>
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={updateMasterInfo}>
          수정
        </Button>
      </div>
    </div>
  );
}
const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const ImageDiv = styled.div`
  text-align: center;
`;

const ProfileImage = styled.img`
  border: 1px solid black;
  border-radius: 50%;
  width: 145px;
  height: 145px;
  &:hover {
    cursor: pointer;
  }
`;

const RepresentImage = styled.img`
  border: 1px solid black;
  width: 145px;
  height: 145px;
  &:hover {
    cursor: pointer;
  }
`;

const ImageLabel = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const ImageForm = styled.div`
  display: flex;
  margin: 0px auto;
  justify-content: space-around;
  padding: 16px;
  max-width: 1200px;
`;
const UpdateForm = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  margin: 0px auto;
  justify-content: space-between;
  padding: 16px;
  max-width: 1200px;
`;
const FormDiv = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 48%;
  max-width: 540px;
`;
