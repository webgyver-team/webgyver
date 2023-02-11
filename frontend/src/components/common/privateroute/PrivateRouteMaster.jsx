import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRouteMaster({
  authenticated,
  component: Component,
}) {
  return authenticated ? (
    Component
  ) : (
    // eslint-disable-next-line no-alert, react/jsx-props-no-spreading
    <Navigate to="/master/login" {...alert('접근할 수 없는 페이지입니다.')} />
  );
}
