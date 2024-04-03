import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './routes';
import { LayoutComponent } from '../components/LayoutComponent';
import { MainPage } from '../pages/MainPage/MainPage';
import { SigninPage } from '../pages/SinginPage/SigninPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { HistoryPage } from '../pages/HistoryPage/HistoryPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <LayoutComponent />,
    children: [
      {
        path: ROUTES.MAIN,
        element: <MainPage />,
      },
      {
        path: ROUTES.SIGNIN,
        element: <SigninPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.SEARCH,
            element: <SearchPage />,
          },
          {
            path: ROUTES.FAVORITES,
            element: <FavoritesPage />,
          },
          {
            path: ROUTES.HISTORY,
            element: <HistoryPage />,
          },
        ],
      },
    ],
  },
]);

const RouterConfig = () => <RouterProvider router={router} />;

export default RouterConfig;
