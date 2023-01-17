/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
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

export default function Home() {
  const [loadding, setLodding] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLodding(false);
    }, 1500);
  }, []);

  if (loadding) {
    return <div>로딩중...</div>;
  }
  return (
    <Main>
      <div>
        <Titlediv>카테고리</Titlediv>
        <CategoryLine left={0} right={1} />
        <CategoryLine left={2} right={3} />
        <CategoryLine left={4} right={5} />
        <CategoryLine left={6} right={7} />
        <CategoryLine left={8} right={9} />
      </div>
    </Main>
  );
}

function CategoryLine(props) {
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
  const icons = useState([
    <BathtubIcon />,
    <DiningIcon />,
    <BoltIcon />,
    <KitchenIcon />,
    <FireplaceIcon />,
    <CribIcon />,
    <WindowOutlinedIcon />,
    <FormatPaintOutlinedIcon />,
    <ImportantDevicesIcon />,
    <HelpOutlineIcon />,
  ]);
  const leftIcon = icons[0][props.left];
  const rightIcon = icons[0][props.right];
  // eslint-disable-next-line react/destructuring-assignment
  return (
    <div>
      <Linediv>
        <Button
          variant="outlined"
          size="large"
          endIcon={leftIcon}
          style={{ minWidth: '150px' }}
        >
          {leftCategory}
        </Button>
        <Button
          variant="outlined"
          size="large"
          endIcon={rightIcon}
          style={{ minWidth: '150px' }}
        >
          {rightCategory}
        </Button>
      </Linediv>
    </div>
  );
}

const Main = styled.div`
  width: 100vw;
`;

const Linediv = styled.div`
  width: 100vw;
  margin-top: 16px;
  display: flex;
  justify-content: space-evenly;
`;

const Titlediv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
