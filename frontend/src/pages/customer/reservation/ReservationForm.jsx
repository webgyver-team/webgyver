import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

  const registReservation = () => {
    const data = {
      customerIdx: null,
      partenrIdx: reservation.idx,
      time: `${reservation.date.replaceAll('-', '')}-${reservation.time.replace(
        ':',
        '',
      )}`,
      address: location.address,
      detailAddress: location.detail,
      categoryIdx,
      title: formTitle,
      content: formContent,
    };
    // eslint-disable-next-line
    console.log(
      `data: [${JSON.stringify(data)}] imageData: [${JSON.stringify(
        imageData,
      )}]`,
    );
    // data에 대한 유효성 검사 필요!!
    if (data.customerIdx === null) {
      // 고객 정보 알 수 없음
    }
    if (data.partenrIdx === null) {
      // 예약 업체 정보 알 수 없음
    }
    if (data.address === '' || data.detailAddress === '') {
      // 주소 정보 알 수 없음
    }
    if (data.categoryIdx === '') {
      // 카테고리 정보 없음
    }
    if (data.title.trim().length === 0) {
      // 제목 입력 유효하지 않음
    }
    if (data.content.trim().length === 0) {
      // 내용 입력 유효하지 않음
    }
    // data로 axios POST하고
    // 결과로 나온 idx를 가지고
    // 이미지 axios POST해야 함
    navigate('/usagehistory');
  };
  const reservationTime = `${reservation.date.split('-')[0]}년 ${
    reservation.date.split('-')[1]
  }월 ${reservation.date.split('-')[2]}일 ${reservation.time.replace(
    ':',
    '시 ',
  )}분`;
  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <FormTitle>예약상담 등록</FormTitle>
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
            <ImageInput setImageData={setImageData} />
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
  width: 100vw;
`;
