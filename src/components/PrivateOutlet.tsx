import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../core/hooks';
import { ROUTES } from '../routes/routes';

export const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={ROUTES.MAIN} />;
};
