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
    console.log("data: ["+data+"] imageData: ["+imageData+"]");
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
      <FormTitle>예약상담 등록</FormTitle>
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
  );
}

const FormTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
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
`;
