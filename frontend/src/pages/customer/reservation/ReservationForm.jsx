/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';
import { sha256 } from 'js-sha256';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageInput from './elements/ImageInput';
import {
  chosenReservation,
  locateValueState,
  categoryState,
  userIdx,
} from '../../../atom';
import { customer } from '../../../api/customerService';

export default function ReservationForm() {
  const navigate = useNavigate();
  const [reservation, setReservation] = useRecoilState(chosenReservation);
  const [reservationTime, setReservationTime] = useState('');
  const location = useRecoilValue(locateValueState);
  const categoryIdx = useRecoilValue(categoryState);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [msgForTitle, setMsgForTitle] = useState('');
  const [msgForContent, setMsgForContent] = useState('');
  const [imageList, setImageList] = useState([]);
  const imageData = [];
  const customerIdx = useRecoilValue(userIdx);

  useEffect(() => {
    setTimeout(() => {
      if (reservation === null || reservation.idx === null) {
        // eslint-disable-next-line
        alert('상담을 할 업체가 선택되지 않았습니다.');
        navigate('/reservation');
      } else {
        setReservationTime(
          `${reservation.date.split('-')[0]}년 ${
            reservation.date.split('-')[1]
          }월 ${reservation.date.split('-')[2]}일 ${reservation.time.replace(
            ':',
            '시 ',
          )}분`,
        );
        // 예약날짜(연-월-일)와 예약시간(시:분)을 합쳐 (년 월 일 시 분) 형태로 for View에 띄우기
      }
    }, 100);
  }, []);
  const changeFormTitle = (event) => {
    if (event.target.value.trim().length > 250) {
      setMsgForTitle('최대 250자까지 입력 가능합니다.');
      return;
    }
    setFormTitle(event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsgForTitle('제목은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForTitle('');
  };
  const changeFormContent = (event) => {
    if (event.target.value.trim().length > 250) {
      setMsgForContent('최대 250자까지 입력 가능합니다.');
      return;
    }
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
        console.log(err);
      });
      const newData = {
        saveName: hashImageName + extensionName,
        originName: imageList[i].name,
      };
      imageData.push(newData);
    }
  };

  const registReservation = async () => {
    const data = {
      customerIdx, // 고객 idx
      sellerIdx: reservation.idx, // 예약 업체 idx
      categoryIdx, // 선택한 카테고리의 idx
      //
      time: `${reservation.date.replaceAll(
        '-',
        '',
      )}-${reservation.time.replaceAll(':', '')}`, // 예약 시간(연월일-시분)
      address: location.address, // 주소
      detailAddress: location.detail, // 상세주소
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
    sendImageListToS3().then(async () => {
      // eslint-disable-next-line
      const response = await customer.post.reservation(data);
      // eslint-disable-next-line
      if (response.statusCode === 200) {
        // eslint-disable-next-line
        alert(
          '예약상담이 등록되었습니다.\n상담 수락 여부는 예약 내역에서 확인 가능합니다.',
        );
        navigate('/usagehistory');
        setReservation(null);
      } else {
        // eslint-disable-next-line
        alert(`${response.message}\n예약 내용을 다시 확인바랍니다.`);
      }
    });
  };

  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <FormTitle>예약상담 등록</FormTitle>
      {reservation !== null ? (
        <FormBox>
          <div>
            <FormInput>
              <TextField
                label="예약업체"
                variant="outlined"
                required
                margin="normal"
                fullWidth
                disabled
                value={reservation.storeName || ''}
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
            <SubmitButton>
              <Button variant="contained" onClick={registReservation}>
                등록
              </Button>
            </SubmitButton>
          </div>
        </FormBox>
      ) : null}
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

const SubmitButton = styled.div`
  textalign: center;
  margin-top: 16px;
`;
