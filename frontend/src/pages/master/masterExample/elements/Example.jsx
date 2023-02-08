/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Example({ example }) {
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Card>
      <ContentBox>
        <div>
          {!example.images.length && <NoImgBox />}
          {example.images && (
            <SliderBox>
              <Slider {...slickSettings}>
                {example.images.map((el) => (
                  <ImgBox key={el}>
                    {console.log(el)}
                    <img
                      src={`https://webgyver.s3.ap-northeast-2.amazonaws.com/${el.saveName}`}
                      alt={el.originName}
                    />
                  </ImgBox>
                ))}
              </Slider>
            </SliderBox>
          )}
        </div>
        <div className="contentdiv">
          <span className="content">{example.content}</span>
        </div>
      </ContentBox>
      <BtnBox>
        <Btn>
          <EditIcon fontSize="small" />
          <BtnText>수정</BtnText>
        </Btn>
        <Btn color="#FF4444">
          <DeleteIcon fontSize="small" style={{ color: '#FF4444' }} />
          <BtnText style={{ color: '#FF4444' }}>삭제</BtnText>
        </Btn>
      </BtnBox>
    </Card>
  );
}

const Card = styled.div`
  padding: 16px 12px 16px 16px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 5px;
  margin: 8px;
  position: relative;

  .slick-list {
    marign-right: -8px;
  }

  .slick-slide {
    padding-right: 4px;
    padding-left: 4px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
  margin: 0 4px 0 4px;
  padding: 6px 8px 6px 8px;
  cursor: pointer;
`;

const BtnText = styled.span`
  font-size: 14px;
  padding: 2px;
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

const ContentBox = styled.div`
  width: 100%;
  display: flex;

  .contentdiv {
    min-width: 480px;
    max-width: 640px;
    margin-right: 8px;
    margin-left: 8px;
    line-height: 16px;
  }

  .content {
    font-size: 14px;
    overflow: hidden;
  }
`;

const SliderBox = styled.div`
  width: 136px;
`;

const NoImgBox = styled.div`
  width: 128px;
  height: 120px;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  margin: 0 4px 0 4px;
`;
