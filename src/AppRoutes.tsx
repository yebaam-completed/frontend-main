import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import AppPage from './feactures/AppPage';


const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />
    },

  ];

  return useRoutes(routes);
};

export default AppRouter;
