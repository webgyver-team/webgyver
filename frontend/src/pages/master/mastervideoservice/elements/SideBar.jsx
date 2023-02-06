/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-undef */
import { React, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReviewImg1 from '../../../../assets/image/review1.jpg';
import ReviewImg2 from '../../../../assets/image/review2.jpg';
import ReviewImg3 from '../../../../assets/image/review3.jpg';

export default function SideBar() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleDrawerToggle = () => {
    setSideBarOpen((prevState) => !prevState);
  };
  const [history] = useState([
    {
      title: '뜨거운 물이 나오지 않는 건에 대하여',
      content:
        '수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!수도꼭지에서 물이 아니라 불까지 나옵니다 어떻게 하죠?!!!',
      date: '01월 28일 09:00',
      images: [ReviewImg1, ReviewImg2, ReviewImg3],
      company: '수리Ssap고수Shop',
    },
  ]);

  const slickSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Main>
      {sideBarOpen && (
        <ContentBox>
          <InnerBox>
            <SdBox>
              <SliderBox>
                <Slider {...slickSettings}>
                  {history[0].images.map((el) => (
                    <ImgBox key={el}>
                      <img src={el} alt="" />
                    </ImgBox>
                  ))}
                </Slider>
              </SliderBox>
            </SdBox>
          </InnerBox>
          <Title>{history[0].title}</Title>
          <Content>{history[0].content}</Content>
        </ContentBox>
      )}
      <OpenToggle onClick={handleDrawerToggle}>
        <span>{sideBarOpen ? '문의 내용 닫기' : '문의 내용 보기'}</span>
      </OpenToggle>
    </Main>
  );
}
const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  min-height: 440px;
  max-width: 380px;

  .slick-prev:before {
    color: gray;
  }

  .slick-next:before {
    color: gray;
  }
`;

const InnerBox = styled.div`
  padding: 16px;
`;

const OpenToggle = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  width: 24px;
  height: 160px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
  border-radius: 0 10px 10px 0;
  cursor: pointer;
`;

const ContentBox = styled.div`
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
  border-radius: 0 0 10px 0;
  padding: 16px;
`;

const SdBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const SliderBox = styled.div`
  width: 280px;
`;

const ImgBox = styled.div`
  position: relative;
  height: 160px;

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

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Content = styled.div`
  font-size: 14px;
`;
