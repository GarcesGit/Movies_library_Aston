import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../core/hooks';
import { ROUTES } from '../routes/routes';

export const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={ROUTES.MAIN} />;
  }
  return <Outlet />;
};