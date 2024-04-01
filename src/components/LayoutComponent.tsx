import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navibar } from './navbar/Navibar';

export const LayoutComponent = () => {
  return (
    <>
      <Navibar />
      <Outlet />
    </>
  );
};
