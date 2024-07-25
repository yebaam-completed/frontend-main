import { FC, ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { applicationLogout, saveToSessionStorage, getDataFromSessionStorage } from 'src/theme/utils/utils.service';

import { addAuthUser } from './auth/reducers/auth.reducer';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import HomeHeader from './home/components/HomeHeader';

export interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const header = useAppSelector((state: IReduxState) => state.header);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  
  // Obtiene el token desde sessionStorage
  const token = getDataFromSessionStorage('isLoggedIn');
  console.log('token',token);

  // Consulta el usuario actual sin la propiedad 'headers'
  const { data, isError } = useCheckCurrentUserQuery();

  const checkUser = useCallback(() => {
    if (data && data.user) {
      setTokenIsValid(true);
      dispatch(addAuthUser({ authInfo: data.user }));
      saveToSessionStorage(JSON.stringify(true), JSON.stringify(data.user.username));
      console.log('saveToSessionStorage', JSON.stringify(data.user.username));
    }

    if (isError) {
      setTokenIsValid(false);
      applicationLogout(dispatch, navigate);
    }
  }, [data, dispatch, navigate, isError]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (tokenIsValid || authUser) {
    return (
      <>
        {header && header === 'home' && <HomeHeader />}
        {children}
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
