import { storageKeys } from 'constants/storage-keys';
import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValidateLogin = ({ children }: any) => {
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem(storageKeys.USER_ACCESS_TOKEN);
  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  } else if (children) {
    return <>{children}</>;
  } else {
    return <Outlet />;
  }
};

export default ValidateLogin;
