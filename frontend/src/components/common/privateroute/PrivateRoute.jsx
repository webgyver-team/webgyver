/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ authenticated, component: Component }) {
  return authenticated === 'customer' ? (
    Component
  ) : (
    // eslint-disable-next-line no-alert
    <Navigate to="/" {...alert('접근할 수 없는 페이지입니다.')} />
  );
}
