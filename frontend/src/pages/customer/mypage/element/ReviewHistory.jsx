import React from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';

export default function MyInfo() {
  return (
    <Main>
      <Review>
        <TitleBox>
          <p>상담일시</p>
          <CustomPen />
        </TitleBox>
      </Review>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
`;

const Review = styled.div`
  padding: 16px;
  background-color: ${(props) => props.theme.color.defaultsubBgColor};
`;

const TitleBox = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomPen = styled(EditIcon)`
  cursor: pointer;
`;
