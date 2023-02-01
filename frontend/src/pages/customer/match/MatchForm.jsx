import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageInput from '../reservation/elements/ImageInput';
import { locateValueState, categoryState } from '../../../atom';

export default function ReservationForm() {
  const location = useRecoilValue(locateValueState);
  const categoryIdx = useRecoilValue(categoryState);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [imageData, setImageData] = useState([]);
  const [cost, setCost] = useState(0);
  const [msgForTitle, setMsgForTitle] = useState('');
  const [msgForContent, setMsgForContent] = useState('');
  const [msgForCost, setMsgForCost] = useState('');
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
      address: location.address,
      detailAddress: location.detail,
      categoryIdx,
      title: formTitle,
      content: formContent,
      cost,
    };
    // eslint-disable-next-line
    console.log("data: ["+JSON.stringify(data)+"] imageData: ["+JSON.stringify(imageData)+"]");
    // data에 대한 유효성 검사 필요!!
    if (data.customerIdx === null) {
      // 고객 정보 알 수 없음
      return;
    }
    if (data.address === '' || data.detailAddress === '') {
      // 주소 정보 알 수 없음
      return;
    }
    if (data.categoryIdx === '') {
      // 카테고리 정보 없음
      return;
    }
    if (data.title.trim().length === 0) {
      // 제목 입력 유효하지 않음
      return;
    }
    if (data.content.trim().length === 0) {
      // 내용 입력 유효하지 않음
    }
    // data로 axios POST하고
    // 결과로 나온 idx를 가지고
    // 이미지 axios POST해야 함
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
    value = `${value.toLocaleString('ko-KR')}`;
    setCost(value);
  };

  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <FormTitle>바로상담 등록</FormTitle>
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
          rows={4}
          onChange={changeFormContent}
          value={formContent}
        />
        <ErrorMessage>{msgForContent}</ErrorMessage>
      </FormInput>
      <FormInput>
        <ImageInput setImageData={setImageData} />
      </FormInput>
      <FormInput style={{ marginTop: '4px' }}>
        <TextField
          label="상담비용"
          variant="outlined"
          required
          multiline
          margin="normal"
          fullWidth
          value={cost}
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
