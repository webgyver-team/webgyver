/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';
import { sha256 } from 'js-sha256';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageInput from '../reviewfrom/elements/ImageInput';
import {
  locateValueState,
  categoryState,
  matchFormState,
  userIdx,
} from '../../../atom';

export default function ReservationForm() {
  const navigate = useNavigate();
  const location = useRecoilValue(locateValueState); // 위치 정보
  const categoryIdx = useRecoilValue(categoryState); // 카테고리 정보
  const customerIdx = useRecoilValue(userIdx); // 고객 idx
  const [matchForm, setMatchForm] = useRecoilState(matchFormState); // matchForm 자체
  const [imageListFromPrev, setImageListFromPrev] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    categoryIdx,
    customerIdx,
    title: '',
    content: '',
    cost: 0,
    address: location.address,
    detailAddress: location.detail,
    images: [],
  });
  const [msgForTitle, setMsgForTitle] = useState(''); // 제목 메시지
  const [msgForContent, setMsgForContent] = useState(''); // 내용 메시지
  const [msgForCost, setMsgForCost] = useState(''); // 비용 메시지
  const [imageList, setImageList] = useState([]); // 이미지 리스트
  const [imageData, setImageData] = useState([]); // 이미지 데이터

  useEffect(() => {
    if (matchForm !== null) {
      setData({
        ...matchForm,
        ...{ images: [] },
      });
      setImageListFromPrev([...matchForm.images]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const changeFormTitle = (event) => {
    if (event.target.value.trim().length > 250) {
      setMsgForTitle('최대 250자까지 입력 가능합니다.');
      return;
    }
    setData((original) => ({
      ...original,
      ...{ title: event.target.value },
    }));
    if (event.target.value.trim().length === 0) {
      setMsgForTitle('제목은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForTitle('');
  };

  const changeFormContent = (event) => {
    if (event.target.value.trim().length > 250) {
      setMsgForContent('최대 250자까지 입력 가능합니다.');
      return;
    }
    setData((original) => ({
      ...original,
      ...{ content: event.target.value },
    }));
    if (event.target.value.trim().length === 0) {
      setMsgForContent('내용은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForContent('');
  };

  // 이미지 S3 전송 함수
  const sendImageListToS3 = async () => {
    if (imageListFromPrev.length > 0) {
      data.images = [...data.images, ...imageListFromPrev];
    }
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    for (let i = 0; i < imageList.length; i += 1) {
      const originName = imageList[i].name;
      const date = new Date();
      const extensionName = `.${originName.split('.').pop()}`;
      const hashImageName = sha256(
        `${date.toString()}${customerIdx}${originName}`,
      ); // [날짜 객체 + 회원 idx + 기존 파일명]을 조합하여 해시 처리
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Key: hashImageName + extensionName, // 고유한 파일명(현재 날짜 + 유저아이디 + 파일명을 합쳐 해시값 생성)
          Body: imageList[i], // 파일 객체 자체를 보냄
        },
      });
      const promise = upload.promise();
      promise.catch((err) => {
        // eslint-disable-next-line
        alert(err);
      });
      const newData = {
        saveName: hashImageName + extensionName,
        originName: imageList[i].name,
      };
      imageData.push(newData);
      setImageData((originalData) => [...originalData, newData]);
    }
  };
  const registReservation = () => {
    // data에 대한 유효성 검사 필요!!
    if (data.customerIdx === null) {
      // 고객 정보 알 수 없음
      // eslint-disable-next-line
      alert('유효하지 않은 고객 정보입니다.');
      return;
    }
    if (data.address === '' || data.detailAddress === '') {
      // 주소 정보 알 수 없음
      // eslint-disable-next-line
      alert('주소 정보를 입력해야 합니다.');
      return;
    }
    if (data.categoryIdx === '') {
      // 카테고리 정보 없음
      // eslint-disable-next-line
      alert('수리 분야가 선택되지 않았습니다.');
      return;
    }
    if (data.title.trim().length === 0) {
      // 제목 입력 유효하지 않음
      // eslint-disable-next-line
      alert('제목을 한 글자 이상 입력해야 합니다.');
      return;
    }
    if (data.content.trim().length === 0) {
      // eslint-disable-next-line
      alert('내용을 한 글자 이상 입력해야 합니다.');
      return;
      // 내용 입력 유효하지 않음
    }
    if (data.content.cost === null) {
      // eslint-disable-next-line
      alert('희망 상담 비용을 입력해야 합니다.');
      return;
    }
    // 이미지 전송 후 받은 url을 picture에 넣고 보낸 후에
    // 잘 보내졌으면 data를 POST
    sendImageListToS3()
      .then(() => {
        setMatchForm({ ...data, ...{ images: data.images.concat(imageData) } });
      })
      .then(() => {
        navigate('/match');
      })
      .catch((err) => {
        // eslint-disable-next-line
        alert(err);
      });
  };
  const onlyNumber = (input) => {
    if (Number.isNaN(Number(input))) {
      setMsgForCost('상담비용은 숫자만 입력할 수 있습니다.');
      return false;
    }
    setMsgForCost('');
    return true;
  };
  const handleCost = (event) => {
    let value = event.target.value.replaceAll(',', '');
    if (!onlyNumber(value)) {
      return;
    }
    value = Number(value);
    if (value >= 100000) {
      setMsgForCost('상담가격은 10만원 미만으로 설정할 수 있습니다.');
      return;
    }
    setData((original) => ({
      ...original,
      ...{ cost: value },
    }));
    value = `${value.toLocaleString('ko-KR')}`;
  };

  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <FormTitle>바로상담 등록</FormTitle>
      <FormBox>
        <div>
          <FormInput>
            <TextField
              label="주소"
              variant="outlined"
              required
              multiline
              margin="normal"
              fullWidth
              disabled
              value={`${location.address} ${location.detail}`}
            />
          </FormInput>
          <FormInput style={{ marginTop: '16px' }}>
            <TextField
              label="제목"
              variant="outlined"
              required
              fullWidth
              onChange={changeFormTitle}
              value={data.title}
            />
            <ErrorMessage>{msgForTitle}</ErrorMessage>
          </FormInput>
          <FormInput style={{ marginTop: '4px' }}>
            <TextField
              label="내용"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              onChange={changeFormContent}
              value={data.content}
            />
            <ErrorMessage>{msgForContent}</ErrorMessage>
          </FormInput>
          {!loading && (
            <FormInput style={{ marginBottom: '16px' }}>
              <ImageInput
                sendImageList={setImageList}
                existImages={matchForm !== null ? matchForm.images : []}
                sendExistImages={setImageListFromPrev}
              />
            </FormInput>
          )}
          <FormInput style={{ marginTop: '4px' }}>
            <TextField
              label="상담비용"
              variant="outlined"
              required
              multiline
              margin="normal"
              fullWidth
              value={data.cost}
              onChange={handleCost}
            />
            <ErrorMessage>{msgForCost}</ErrorMessage>
          </FormInput>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button variant="contained" onClick={registReservation}>
              등록
            </Button>
          </div>
        </div>
      </FormBox>
    </div>
  );
}

const FormBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 8px;
  line-height: 100%;
  min-height: 16px;
  display: flex;
  align-items: center;
  margin: 4px 0px;
`;

const FormInput = styled.div`
  max-width: 400px;
  width: 90vw;
`;
