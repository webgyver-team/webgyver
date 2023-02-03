/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Review({ review }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
    <Card>
      <ContentBox>
        <SliderBox>
          <Slider {...slickSettings}>
            {review.images.map((el) => (
              <ImgBox key={el}>
                <img src={el} alt="" />
              </ImgBox>
            ))}
          </Slider>
        </SliderBox>
        <div className="contentdiv">
          <p className="content">{review.content}</p>
        </div>
      </ContentBox>
      <ReplyBox>
        <p>{review.reply}</p>
      </ReplyBox>
      <div style={{ marginTop: '4px' }}>
        <NullBox />
        <ReviewBox>
          <TextField
            label="내용"
            variant="outlined"
            required
            fullWidth
            multiline
            maxRows={4}
            style={{ maxWidth: '700px' }}
            onChange={changeFormContent}
            value={formContent}
          />
          <Button variant="contained" onClick={registReview}>
            리뷰 등록
          </Button>
        </ReviewBox>
        <ErrorMessage>{msgForContent}</ErrorMessage>
      </div>
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 12px 16px 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 5px;
  margin: 8px;
  width: 912px;

  .title {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 4px;
  }

  .price {
    font-size: 12px;
    padding-bottom: 4px;
  }

  .contentdiv {
    min-width: 480px;
    max-width: 540px;
    margin-right: 8px;
    margin-left: 8px;
    line-height: 16px;
  }

  .content {
    font-size: 14px;
    overflow: hidden;
  }

  .slick-list {
    marign-right: -8px;
  }

  .slick-slide {
    padding-right: 4px;
    padding-left: 4px;
  }
`;

const ContentBox = styled.div`
  display: flex;
`;

const ImgBox = styled.div`
  position: relative;
  height: 120px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const SliderBox = styled.div`
  width: 136px;
`;

const NullBox = styled.div`
  height: 16px;
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
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

const ReplyBox = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 10px;
  width: 700px;

  p {
    font-size: 14px;
  }
`;
