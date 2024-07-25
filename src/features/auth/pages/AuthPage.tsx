import {Route, Routes} from 'react-router-dom';

import LoginT from '../components/LoginT';
import RegisterT from '../components/RegisterT';
import { AuthLayout } from './AuthLayout';
// import {Registration} from './components/Registration'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<LoginT />} />
      <Route path='registration' element={<RegisterT />} />
      {/* <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} /> */}
    </Route>
  </Routes>
);

export {AuthPage};
