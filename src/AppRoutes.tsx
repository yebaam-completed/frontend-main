import { FC, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import AppPage from './features/AppPage';
import LoginT from './features/auth/components/LoginT';
import Home from './features/home/components/Home';
import ProtectedRoute from './features/ProtectedRoute';


const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />
    },

    {
      path: '/login',
      element: <LoginT />
    },

    {
      path: '/home',
      element: (
        <Suspense>
          <ProtectedRoute>
              <Home />

          </ProtectedRoute>
        </Suspense>
      )
    },


  ];

  return useRoutes(routes);
};

export default AppRouter;
