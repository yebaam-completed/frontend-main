/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import { App } from '../App'
import LandingPage from '../../landing/LandingPage'


const {BASE_URL} = import.meta.env

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();
console.log('AppRoutes currentUser:', currentUser);
return (
  <BrowserRouter basename={BASE_URL}>
    <Routes>
      <Route element={<App />}>
        <Route path='error/*' element={<ErrorsPage />} />
        <Route path='logout' element={<Logout />} />
        {currentUser ? (
          <>
            <Route path='/*' element={<PrivateRoutes />} />
            <Route index element={<Navigate to='/dashboard' />} />
          </>
        ) : (
          <>
            <Route path='auth/*' element={<AuthPage />} />
            <Route path='landing' element={<LandingPage />} />
            <Route path='*' element={<Navigate to='/landing' />} />
          </>
        )}
      </Route>
    </Routes>
  </BrowserRouter>
);

}

export {AppRoutes}
