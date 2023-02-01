import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageInput from './elements/ImageInput';

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [formContent, setFormContent] = useState('');
  const [msgForContent, setMsgForContent] = useState('');

  const changeFormContent = (event) => {
    setFormContent(event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsgForContent('내용은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForContent('');
  };
  const registReview = () => {
    const data = {
      customerIdx: null,
      partenrIdx: null,
      categoryIdx: null,
      content: formContent,
    };
    // eslint-disable-next-line
    console.log(data);
    // data로 axios POST하고
    // 결과로 나온 idx를 가지고
    // 이미지 axios POST해야 함
  };

  return (
    <Main>
      <SignUpTitle>리뷰 작성</SignUpTitle>
      <NullBox />
      <Header>평점을 매겨주세요.</Header>
      <NullBox />
      <Box>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="large"
        />
      </Box>
      <NullBox />
      <div>
        <ImageInput />
      </div>
      <NullBox />
      <NullBox />
      <div style={{ marginTop: '4px' }}>
        <Header>리뷰를 입력해 주세요.</Header>
        <NullBox />
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
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button variant="contained" onClick={registReview}>
          리뷰 등록
        </Button>
      </div>
    </Main>
  );
}

const Main = styled.div`
  margin: 16px;
  width: 90%;
`;

const SignUpTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
`;

const NullBox = styled.div`
  height: 16px;
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
