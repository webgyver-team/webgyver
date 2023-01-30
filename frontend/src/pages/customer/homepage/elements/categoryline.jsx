/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styled from 'styled-components';
// import Button from '@mui/material/Button';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import FireplaceOutlinedIcon from '@mui/icons-material/FireplaceOutlined';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import ImagesearchRollerOutlinedIcon from '@mui/icons-material/ImagesearchRollerOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { categoryState } from '../../../../atom';

export default function CategoryLine(props) {
  const setCategory = useSetRecoilState(categoryState);
  const navigate = useNavigate();
  const categories = useState([
    '욕실',
    '주방',
    '전기/조명',
    '가전',
    '보일러',
    '가구',
    '도어/창문',
    '벽지/바닥',
    '디지털/IT',
    '기타',
  ]);
  const leftCategory = categories[0][props.left];
  const rightCategory = categories[0][props.right];
  const setLeftCategory = () => {
    setCategory(leftCategory);
    navigate('/reservation');
  };
  const setRightCategory = () => {
    setCategory(rightCategory);
    navigate('/reservation');
  };
  const icons = useState([
    <BathtubOutlinedIcon fontSize="small" />,
    <CountertopsOutlinedIcon fontSize="small" />,
    <BoltIcon fontSize="small" />,
    <KitchenOutlinedIcon fontSize="small" />,
    <FireplaceOutlinedIcon fontSize="small" />,
    <span className="material-symbols-outlined">dresser</span>,
    <WindowOutlinedIcon fontSize="small" />,
    <ImagesearchRollerOutlinedIcon fontSize="small" />,
    <DevicesOutlinedIcon fontSize="small" />,
    <HelpOutlineIcon fontSize="small" />,
  ]);
  const leftIcon = icons[0][props.left];
  const rightIcon = icons[0][props.right];
  // eslint-disable-next-line react/destructuring-assignment
  return (
    <div>
      <Linediv>
        <CategoryBtn onClick={setLeftCategory}>
          <span>{leftCategory}</span>
          {leftIcon}
        </CategoryBtn>
        <CategoryBtn onClick={setRightCategory}>
          <span>{rightCategory}</span>
          {rightIcon}
        </CategoryBtn>
      </Linediv>
    </div>
  );
}

const CategoryBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 15px;
  font-size: 14px;
  padding: 0 16px 0 16px;
  width: 140px;
  height: 42px;
  box-shadow: 1px 1px 4px 0px ${(props) => props.theme.color.dafaultBorder};

  :hover {
    cursor: pointer;
  }

  span {
    padding-right: 8px;
  }
`;

const Linediv = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-evenly;
`;

// const CategoryButton = styled(Button)`
//   color: ${(props) => props.theme.color.defaultDotColor};
// `;
