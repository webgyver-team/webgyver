import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageInput from './elements/ImageInput';
import {
  chosenReservation,
  locateValueState,
  categoryState,
} from '../../../atom';

export default function ReservationForm() {
  const reservation = useRecoilValue(chosenReservation);
  const location = useRecoilValue(locateValueState);
  const categoryIdx = useRecoilValue(categoryState);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [msgForTitle, setMsgForTitle] = useState('');
  const [msgForContent, setMsgForContent] = useState('');
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
    console.log(data);
    // data로 axios POST하고
    // 결과로 나온 idx를 가지고
    // 이미지 axios POST해야 함
  };
  const reservationTime = `${reservation.date.split('-')[0]}년 ${
    reservation.date.split('-')[1]
  }월 ${reservation.date.split('-')[2]}일 ${reservation.time.replace(
    ':',
    '시 ',
  )}분`;
  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <SignUpTitle>예약상담 등록</SignUpTitle>
      <div>
        <TextField
          label="예약업체"
          variant="outlined"
          required
          margin="normal"
          fullWidth
          style={{ maxWidth: '400px' }}
          disabled
          value={reservation.storeName}
        />
      </div>
      <div>
        <TextField
          label="예약일시"
          variant="outlined"
          required
          margin="normal"
          fullWidth
          style={{ maxWidth: '400px' }}
          disabled
          value={reservationTime}
        />
      </div>
      <div>
        <TextField
          label="주소"
          variant="outlined"
          required
          multiline
          margin="normal"
          fullWidth
          style={{ maxWidth: '400px' }}
          disabled
          value={`${location.address} ${location.detail}`}
        />
      </div>
      <div style={{ marginTop: '16px' }}>
        <TextField
          label="제목"
          variant="outlined"
          required
          fullWidth
          style={{ maxWidth: '400px' }}
          onChange={changeFormTitle}
          value={formTitle}
        />
        <ErrorMessage>{msgForTitle}</ErrorMessage>
      </div>
      <div style={{ marginTop: '6px' }}>
        <TextField
          label="내용"
          variant="outlined"
          required
          fullWidth
          multiline
          maxRows={4}
          style={{ maxWidth: '400px' }}
          onChange={changeFormContent}
          value={formContent}
        />
        <ErrorMessage>{msgForContent}</ErrorMessage>
      </div>
      <div>
        <ImageInput />
      </div>
      <BtnBox>
        <Button variant="contained" onClick={registReservation}>
          예약상담 등록하기
        </Button>
      </BtnBox>
    </div>
  );
}

const SignUpTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
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

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
