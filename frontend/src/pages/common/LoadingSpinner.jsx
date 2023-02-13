import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingSpinner({ height }) {
  return (
    <LoadingBox height={height}>
      <CircularProgress />
    </LoadingBox>
  );
}

const LoadingBox = styled.div`
  height: ${(props) => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
