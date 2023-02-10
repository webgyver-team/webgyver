import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingSpinner() {
  return (
    <LoadingBox>
      <CircularProgress />
    </LoadingBox>
  );
}

const LoadingBox = styled.div`
  // height: px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
