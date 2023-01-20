/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styled from 'styled-components';
// import Button from '@mui/material/Button';
import BathtubIcon from '@mui/icons-material/Bathtub';
import DiningIcon from '@mui/icons-material/Dining';
import BoltIcon from '@mui/icons-material/Bolt';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import CribIcon from '@mui/icons-material/Crib';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSetRecoilState } from 'recoil';
import { categoryState } from '../../../atom';

export default function CategoryLine(props) {
  const setCategory = useSetRecoilState(categoryState);
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
  const setLeftCategory = () => setCategory(leftCategory);
  const setRightCategory = () => setCategory(rightCategory);
  const icons = useState([
    <BathtubIcon fontSize="small" />,
    <DiningIcon fontSize="small" />,
    <BoltIcon fontSize="small" />,
    <KitchenIcon fontSize="small" />,
    <FireplaceIcon fontSize="small" />,
    <CribIcon fontSize="small" />,
    <WindowOutlinedIcon fontSize="small" />,
    <FormatPaintOutlinedIcon fontSize="small" />,
    <ImportantDevicesIcon fontSize="small" />,
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
  border: 1px solid black;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  padding: 0 16px 0 16px;
  width: 140px;

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
