/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import AWS from 'aws-sdk';
import { sha256 } from 'js-sha256';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageInput from './elements/ImageInput';
import { userIdx, reservationIdxState } from '../../../atom';
import { customer } from '../../../api/customerService';

export default function ReviewForm() {
  const navigate = useNavigate();
  const params = useParams();
  // eslint-disable-next-line
  const [reservationIdx, setReservationIdx] =
    useRecoilState(reservationIdxState);
  const customerIdx = useRecoilValue(userIdx);
  const [newForm, setNewForm] = useState(null);
  const [imageListFromReview, setImageListFromReview] = useState([]);
  const [data, setData] = useState({
    idx: reservationIdx, // review or reservationIdx,
    title: '',
    content: '',
    rating: 5,
    images: [],
  });
  useLayoutEffect(() => {
    if (Object.keys(params).length === 0) {
      // 얘는 등록 모드 -> idx를 reviewIdx로 덮어 써야 함
      setNewForm(true);
      if (reservationIdx === null) {
        navigate('/');
        // eslint-disable-next-line
        alert('잘못된 접근입니다.');
      }
    } else {
      // 얘는 수정 모드 -> idx를 reservationIdx로 덮어 써야 함
      setNewForm(false);
      const getReview = async () => {
        const response = await customer.get.review(params.rIdx);
        if (response.statusCode === 200) {
          setReservationIdx(response.data.review.reviewIdx);
          setData(() => ({
            ...response.data.review,
            ...{ images: [] },
          }));
          response.data.review.images.forEach((image) => {
            imageListFromReview.push(image);
          });
        } else {
          // eslint-disable-next-line
          alert('해당 리뷰를 수정할 수 없습니다.');
          navigate('/mypage');
        }
      };
      getReview();
    }
  }, []);

  const [msgForTitle, setMsgForTitle] = useState('');
  const [msgForContent, setMsgForContent] = useState('');

  const [imageList, setImageList] = useState([]);
  const [imageData, setImageData] = useState([]);
  const changeTitle = (event) => {
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
  const changeContent = (event) => {
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

  // 이미지 전송함수
  const sendImageListToS3 = async () => {
    if (imageListFromReview.length > 0) {
      data.images = [...data.images, ...imageListFromReview]; // 이미지 데이터에 기존 이미지 추가
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
        console.log(err);
      });
      const newData = {
        saveName: hashImageName + extensionName,
        originName: imageList[i].name,
      };
      imageData.push(newData);
      setImageData((original) => [...original, newData]);
    }
  };
  const registReview = async () => {
    // 신규 폼 등록
    sendImageListToS3().then(async () => {
      if (newForm) {
        data.reservationIdx = data.idx;
        delete data.idx;
        const response = await customer.post.review({
          ...data,
          ...{ images: imageData },
        });
        if (response.statusCode === 200) {
          // eslint-disable-next-line
          alert('리뷰가 등록되었습니다.');
          setReservationIdx(null); // 등록할 예약 idx를 해제
          navigate('/mypage');
        } else {
          // eslint-disable-next-line
          alert(response.message);
        }
      } else {
        delete data.idx;
        const response = await customer.put.review(
          {
            ...data,
            ...{ images: data.images.concat(imageData) },
          },
          data.reviewIdx,
        );
        if (response.statusCode === 200) {
          // eslint-disable-next-line
          alert('리뷰가 수정되었습니다.');
          setReservationIdx(null); // 등록할 예약 idx를 해제
          navigate('/mypage');
        } else {
          // eslint-disable-next-line
          alert(response.message);
        }
      }
    });
  };
  return (
    <Main>
      <div>
        <SignUpTitle>
          {newForm === true ? '리뷰 작성' : '리뷰 수정'}
        </SignUpTitle>
        <NullBox />
        <Header>평점을 매겨주세요.</Header>
        <NullBox />
        <Box>
          <Rating
            name="simple-controlled"
            value={data.rating || 5}
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
            onChange={changeContent}
            value={data.content}
          />
          <ErrorMessage>{msgForContent}</ErrorMessage>
        </div>

        <div>
          <ImageInput
            sendImageList={setImageList}
            existImages={imageListFromReview}
            sendExistImages={setImageListFromReview}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Button variant="contained" onClick={registReview}>
            {newForm === true ? '리뷰 등록' : '리뷰 수정'}
          </Button>
        </div>
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
