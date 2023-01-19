import React from 'react';
import styled from 'styled-components';

export default function Message({ msg }) {
  return <ErrorMessage>{msg}</ErrorMessage>;
}

const ErrorMessage = styled.div`
  color: red;
  font-size: 8px;
  line-height: 100%;
  min-height: 16px;
  display: flex;
  align-items: center;
  margin: 4px 0px;
`;
