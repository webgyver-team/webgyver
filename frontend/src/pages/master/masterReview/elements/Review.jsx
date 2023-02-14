/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRecoilValue } from 'recoil';
import { userIdx } from '../../../../atom';
import { master } from '../../../../api/masterService';

export default function Review({ review, setReload }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const userId = useRecoilValue(userIdx);

  const [formContent, setFormContent] = useState(
    review.comment?.commentContent ? review.comment.commentContent : '',
  );
  const [msgForContent, setMsgForContent] = useState('');

  const [edit, setEdit] = useState(false);
  const openEdit = () => {
    setEdit(true);
  };

  const changeFormContent = (event) => {
    setFormContent(event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsgForContent('내용은 한 글자 이상으로 작성해야 합니다.');
    } else if (event.target.value.trim().length > 250) {
      setMsgForContent('최대 250자까지 입력 가능합니다.');
    } else setMsgForContent('');
  };
  const registComment = () => {
    const data = {
      sellerIdx: userId,
      reservationIdx: review.reservationIdx,
      comment: formContent,
    };
    // data로 axios POST하고
    const postComment = async () => {
      const response = await master.post.review(data);
      if (response.statusCode === 200) {
        // eslint-disable-next-line
        alert('댓글이 등록되었습니다.');
        setFormContent('');
        setReload(true);
      } else {
        // eslint-disable-next-line no-alert
        alert('댓글 등록에 실패했습니다.');
      }
    };
    const putData = {
      sellerIdx: userId,
      commentIdx: review.comment?.commentIdx,
      commentContent: formContent,
    };
    const putComment = async () => {
      const response = await master.put.review(putData, review.reviewIdx);
      if (response.statusCode === 200) {
        // eslint-disable-next-line
        alert('댓글이 수정되었습니다.');
        // setFormContent('');
        setReload(true);
        setEdit(false);
      } else {
        // eslint-disable-next-line no-alert
        alert('댓글 수정에 실패했습니다.');
      }
    };
    // eslint-disable-next-line no-unused-expressions
    review.comment === null ? postComment() : putComment();
  };

  const removeComment = () => {
    const deleteComment = async () => {
      const response = await master.delete.review(review.comment.commentIdx);
      if (response.statusCode === 200) {
        // eslint-disable-next-line
        alert('댓글이 삭제되었습니다.');
        // setFormContent('');
        setReload(true);
        setEdit(false);
        setFormContent('');
      } else {
        // eslint-disable-next-line no-alert
        alert('댓글 삭제에 실패했습니다.');
      }
    };
    deleteComment();
  };

  return (
    <Card>
      <ContentBox>
        {!review.images.length && <NoImgBox />}
        {review.images.length > 0 && (
          <SliderBox>
            <Slider {...slickSettings}>
              {review.images.map((el) => (
                <ImgBox key={el}>
                  <img
                    src={`https://webgyver.s3.ap-northeast-2.amazonaws.com/${el.saveName}`}
                    alt=""
                  />
                </ImgBox>
              ))}
            </Slider>
          </SliderBox>
        )}
        <div className="contentdiv">
          <div>
            <span className="name">{`작성자 : ${review.customerName}`}</span>
            <span className="name">{`평점 : ${review.rating}`}</span>
          </div>
          <p className="content">{review.content}</p>
        </div>
      </ContentBox>
      {review.comment !== null && !edit && (
        <div>
          <NullBox />
          <ReviewBox>
            <ReplyBox>
              <div>{review.comment.commentContent}</div>
            </ReplyBox>
            <Btn color="#FF4444" onClick={removeComment}>
              <DeleteIcon fontSize="small" style={{ color: '#FF4444' }} />
              <BtnText style={{ color: '#FF4444' }}>삭제</BtnText>
            </Btn>
            <Button
              variant="contained"
              onClick={openEdit}
              style={{ minWidth: '94px' }}
            >
              댓글 수정
            </Button>
          </ReviewBox>
        </div>
      )}
      {(review.comment === null || edit) && (
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
              style={{ maxWidth: '700px', marginRight: '4px' }}
              onChange={changeFormContent}
              value={formContent}
            />
            <Button
              variant="contained"
              onClick={registComment}
              style={{ minWidth: '94px' }}
            >
              댓글 등록
            </Button>
          </ReviewBox>
          <ErrorMessage>{msgForContent}</ErrorMessage>
        </div>
      )}
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 12px 16px 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 5px;
  margin: 8px;
  width: 70vw;
  min-width: 660px;

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

  .name {
    font-size: 14px;
    margin-right: 8px;
    line-height: 30px;
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
  height: 8px;
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
  padding: 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 10px;
  width: 700px;

  div {
    font-size: 14px;
  }
`;

const NoImgBox = styled.div`
  width: 128px;
  min-width: 128px;
  height: 120px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  margin: 0 4px 8px 4px;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
  margin: 0 4px 0 4px;
  padding: 6px 8px 6px 8px;
  cursor: pointer;
  min-width: 70px;
`;

const BtnText = styled.span`
  font-size: 14px;
  padding: 2px;
`;
