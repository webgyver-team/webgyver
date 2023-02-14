/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { sha256 } from 'js-sha256';
import AWS from 'aws-sdk';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import PasswordInput from '../../common/signup/elements/PasswordInput';
import PhoneNumberInput from '../../common/signup/elements/PhoneNumberInput';
import CompanyNameInput from '../masterSignUp/elements/CompanyNameInput';
import RepresentativeNameInput from '../masterSignUp/elements/RepresentativeNameInput';
import CompanyNumberInput from '../masterSignUp/elements/CompanyNumberInput';
import AddressInput from '../masterSignUp/elements/AddressInput';
import CategoryInput from '../masterSignUp/elements/CategoryInput';
import { master } from '../../../api/masterService';
import { userIdx } from '../../../atom';

export default function MyPageUpdate() {
  const navigate = useNavigate();
  const [idx] = useRecoilState(userIdx);
  const [myPageData, setMyPageData] = useState(null);
  const [data, setData] = useState({});
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [ready, setReady] = useState([true, true]);

  // eslint-disable-next-line
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
  const sendRequest = async () => {
    console.log('PUT 요청 실행');
    const response = await master.put.profile(data, idx);
    if (response.statusCode === 200) {
      alert('수정이 완료되었습니다.');
      navigate('/master/mypage');
    } else {
      // eslint-disable-next-line
      alert('다시 시도해주세요.');
    }
  };
  useLayoutEffect(() => {
    const getMyPageData = async () => {
      const response = await master.get.myPage(idx);
      console.log('GET 요청 실행');
      setMyPageData(response.data.profile);
      setData({
        password: null,
        companyName: response.data.profile.companyName,
        phoneNumber: response.data.profile.phoneNumber,
        partnerName: response.data.profile.partnerName,
        companyNumber: response.data.profile.companyNumber,
        address: response.data.profile.address,
        detailAddress: response.data.profile.detailAddress,
        categoryList: response.data.profile.categoryList,
        profileImage: response.data.profile.profileImage,
        backgroundImage: response.data.profile.backgroundImage,
      });
    };
    getMyPageData();
  }, []);
  useEffect(() => {
    if (newProfileImage !== null) {
      const reader = new FileReader();
      console.log(newProfileImage);
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
  useEffect(() => {
    if (ready[0] && ready[1]) {
      sendRequest();
    }
  }, [ready]);

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
      `${date.toString()}${myPageData && myPageData.idx}${originName}`,
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
        console.log(
          `${res.Location}에 ${image}를 ${hashImageName} 경로에 저장 완료`,
        );
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
      setReady([true, ready[1]]);
    } else {
      // 배경 이미지
      updateData({ backgroundImage: newData.saveName });
      setReady([ready[0], true]);
    }
    console.log(data, ready);
  };

  const updateMasterInfo = async () => {
    console.log('수정 버튼 클릭');
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
    console.log('여기까지 통과');
    // 프로필, 대표 이미지 새로 추가된 부분 S3에 보내줌 + 데이터 경로 setData
    if (newProfileImage !== null) {
      // S3 전송함수에 적용
      setReady([false, ready[1]]);
      sendImageToS3(newProfileImage, 1);
    } else {
      setReady([true, ready[1]]);
    }
    if (newBackgroundImage !== null) {
      // S3 전송함수에 적용
      setReady([ready[0], false]);
      sendImageToS3(newBackgroundImage, 2);
    } else {
      setReady([ready[0], true]);
    }
  };
  // 데이터 POST
  // eslint-disable-next-line

  if (myPageData) {
    return (
      <div style={{ width: '100%', padding: '16px' }}>
        <Title>마스터 회원정보 수정</Title>
        <ImageForm>
          <ImageDiv>
            <label htmlFor="profile-image-input">
              <ProfileImage
                src={
                  profileImagePreview === null
                    ? `https://webgyver.s3.ap-northeast-2.amazonaws.com/${myPageData.profileImage}`
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
                    ? `https://webgyver.s3.ap-northeast-2.amazonaws.com/${myPageData.backgroundImage}`
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
            <PasswordInput updateData={updateData} />
            <PhoneNumberInput
              updateData={updateData}
              initialValue1={
                myPageData.phoneNumber !== null
                  ? myPageData.phoneNumber.slice(0, 3)
                  : null
              }
              initialValue2={
                myPageData.phoneNumber !== null
                  ? myPageData.phoneNumber.slice(3, 7)
                  : null
              }
              initialValue3={
                myPageData.phoneNumber !== null
                  ? myPageData.phoneNumber.slice(7, 11)
                  : null
              }
            />
          </FormDiv>
          <FormDiv>
            <CompanyNameInput
              updateData={updateData}
              initialValue={myPageData.companyName}
            />
            <RepresentativeNameInput
              updateData={updateData}
              initialValue={myPageData.partnerName}
            />
            <CompanyNumberInput
              updateData={updateData}
              i
              initialValue1={
                myPageData.companyNumber !== null
                  ? myPageData.companyNumber.slice(0, 3)
                  : null
              }
              initialValue2={
                myPageData.companyNumber !== null
                  ? myPageData.companyNumber.slice(3, 5)
                  : null
              }
              initialValue3={
                myPageData.companyNumber !== null
                  ? myPageData.companyNumber.slice(5, 11)
                  : null
              }
            />
            <AddressInput updateData={updateData} />
            <CategoryInput
              updateData={updateData}
              initialList={myPageData.categoryList}
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
