/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageInput from './elements/ImageInput';
import { reviewToEdit, reservationToReview } from '../../../atom';

export default function ReviewForm() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  // {
  //   reviewIdx/reservationIdx,
  //   title,
  //   content,
  //   rating,
  //   images: [{
  //     originName,
  //     saveName,
  //   }]
  // }
  const [msgForTitle, setMsgForTitle] = useState('');
  const [msgForContent, setMsgForContent] = useState('');

  const [review, setReview] = useRecoilState(reviewToEdit);
  // eslint-disable-next-line
  const [reservation, setReservation] = useRecoilState(reservationToReview);

  useEffect(() => {
    if (review !== null) {
      // 얘는 예약 수정일 것임!
      setData(review);
    } else if (reservation !== null) {
      setData({
        reservationIdx: reservation.reservationIdx,
        title: '',
        content: '',
        rating: 5,
        images: [],
      });
    } else {
      // eslint-disable-next-line
      alert("잘못된 경로입니다.");
      navigate('/');
    }
  }, []);
  const registReview = () => {
    // eslint-disable-next-line
    console.log(data);
    // data로 axios POST하고
    // 결과로 나온 idx를 가지고
    // 이미지 axios POST해야 함
    setReview(review); // 수정한 리뷰 없애줘야 함
    setReservation(reservation); // 등록한 예약 번호 없애줘야 함
    // navigate('/');
  };
  const changeTitle = (event) => {
    setData((original) => ({
      ...original,
      ...{ title: event.target.value },
    }));
    if (event.target.value.trim().length === 0) {
      setMsgForTitle('제목은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForTitle('');
  };
  const changeContent = (event) => {
    setData((original) => ({
      ...original,
      ...{ content: event.target.value },
    }));
    if (event.target.value.trim().length === 0) {
      setMsgForContent('내용은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForContent('');
  };
  return (
    <Main>
      {data !== null ? (
        <div>
          <SignUpTitle>리뷰 작성</SignUpTitle>
          <NullBox />
          <Header>평점을 매겨주세요.</Header>
          <NullBox />
          <Box>
            <Rating
              name="simple-controlled"
              value={data.rating}
              onChange={(event, newValue) => {
                setData((original) => ({
                  ...original,
                  ...{ rating: newValue },
                }));
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
            <NullBox />
            <TextField
              label="제목"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={1}
              style={{ maxWidth: '400px' }}
              onChange={changeTitle}
              value={data.title}
            />
            <ErrorMessage>{msgForTitle}</ErrorMessage>
            <NullBox />
            <TextField
              label="내용"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              style={{ maxWidth: '400px' }}
              onChange={changeContent}
              value={data.content}
            />
            <ErrorMessage>{msgForContent}</ErrorMessage>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button variant="contained" onClick={registReview}>
              리뷰 등록
            </Button>
          </div>
        </div>
      ) : null}
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
