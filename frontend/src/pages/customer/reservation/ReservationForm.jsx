import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AWS from 'aws-sdk';
import ImageInput from './elements/ImageInput';
import {
  chosenReservation,
  locateValueState,
  categoryState,
} from '../../../atom';

export default function ReservationForm() {
  const navigate = useNavigate();
  const reservation = useRecoilValue(chosenReservation);
  const location = useRecoilValue(locateValueState);
  const categoryIdx = useRecoilValue(categoryState);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [msgForTitle, setMsgForTitle] = useState('');
  const [msgForContent, setMsgForContent] = useState('');
  const [imageList, setImageList] = useState([]);
  const [imageData, setImageData] = useState([]);
  const changeFormTitle = (event) => {
    setFormTitle(event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsgForTitle('제목은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForTitle('');
  };
  const changeFormContent = (event) => {
    setFormContent(event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsgForContent('내용은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForContent('');
  };
  // 이미지 S3 전송 함수
  const sendImageListToS3 = async () => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    for (let i = 0; i < imageList.length; i += 1) {
      // console.log(`${imageList[i].name} 업로드 시도 중..`);
      const originName = imageList[i].name;
      const date = new Date();
      const extensionName = `.${originName.split('.').pop()}`;
      const hashImageName = sha256(
        `${date.toString()}customerIdx${imageList[i].name}`,
      ); // [날짜 객체 + 회원 idx + 기존 파일명]을 조합하여 해시 처리
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Key: hashImageName + extensionName, // 고유한 파일명(현재 날짜 + 유저아이디 + 파일명을 합쳐 해시값 생성)
          Body: imageList[i], // 파일 객체 자체를 보냄
        },
      });
      const promise = upload.promise();
      promise
        .then((res) => {
          // eslint-disable-next-line
          console.log(res.Location+"에 "+imageList[i]+"를 저장 완료");
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
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
    const data = {
      customerIdx: 100, // 고객 idx
      partenrIdx: reservation.idx, // 예약 업체 idx
      time: `${reservation.date.replaceAll('-', '')}-${reservation.time.replace(
        ':',
        '',
      )}`, // 예약 시간(연월일-시분)
      address: location.address, // 주소
      detailAddress: location.detail, // 상세주소
      categoryIdx, // 선택한 카테고리의 idx
      title: formTitle, // 제목
      content: formContent, // 내용
      images: imageData, // 이미지 파일의 hash 이름, 원래 이름
    };
    // data에 대한 유효성 검사 필요!!
    if (data.customerIdx === null) {
      // 고객 정보 알 수 없음
      // eslint-disable-next-line
      alert('유효하지 않은 고객 정보입니다.');
      return;
    }
    if (data.partenrIdx === null) {
      // 예약 업체 정보 알 수 없음
      // eslint-disable-next-line
      alert('유효하지 않은 예약 업체입니다.');
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
      // 내용 입력 유효하지 않음
      // eslint-disable-next-line
      alert('내용을 한 글자 이상 입력해야 합니다.');
      return;
    }

    // 이미지 전송 후 받은 url을 picture에 넣고 보낸 후에
    // 잘 보내졌으면 data를 POST
    sendImageListToS3()
      .then(() => {
        // eslint-disable-next-line
        console.log(data); // POST로 수정 예정
      })
      .then(() => {
        navigate('/usagehistory');
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err);
      });
  };

  const reservationTime = `${reservation.date.split('-')[0]}년 ${
    reservation.date.split('-')[1]
  }월 ${reservation.date.split('-')[2]}일 ${reservation.time.replace(
    ':',
    '시 ',
  )}분`; // 예약날짜(연-월-일)와 예약시간(시:분)을 합쳐 (년 월 일 시 분) 형태로 for View에 띄우기
  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <FormTitle>예약상담 등록</FormTitle>
      <Form>
        <div>
          <FormInput>
            <TextField
              label="예약업체"
              variant="outlined"
              required
              margin="normal"
              fullWidth
              disabled
              value={reservation.storeName}
            />
          </FormInput>
          <FormInput>
            <TextField
              label="예약일시"
              variant="outlined"
              required
              margin="normal"
              fullWidth
              disabled
              value={reservationTime}
            />
          </FormInput>
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
              value={formTitle}
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
              maxRows={4}
              onChange={changeFormContent}
              value={formContent}
            />
            <ErrorMessage>{msgForContent}</ErrorMessage>
          </FormInput>
          <FormInput>
            <ImageInput sendImageList={setImageList} />
          </FormInput>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button variant="contained" onClick={registReservation}>
              등록
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

const Form = styled.div`
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
  width: 100vw;
`;
