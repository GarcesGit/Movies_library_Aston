import React from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { Navibar } from './navbar/Navibar';

export const LayoutComponent = () => {
  return (
    <>
      <Navibar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
};
