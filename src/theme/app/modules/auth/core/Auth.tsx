/* eslint-disable react-refresh/only-export-components */
import {createContext, Dispatch, FC, SetStateAction,useContext, useEffect, useState} from 'react';
import { WithChildren } from 'src/theme/app/helpers';
import { LayoutSplashScreen } from 'src/theme/app/layout/core';

import {AuthModel, UserModel} from './_models';
import {getUserByToken} from './_requests';
import * as authHelper from './AuthHelpers';

type AuthContextProps = {
  auth: AuthModel | undefined
  
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};
console.log('initAuthContextPropsState.auth',initAuthContextPropsState.auth);
console.log('initAuthContextPropsState.currentUser',initAuthContextPropsState.currentUser);


const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const saveAuth = (auth: AuthModel | undefined) => {
    console.log('saveAuth called with:', auth);

    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    console.log('logout called');

    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, currentUser, logout, setCurrentUser} = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  // useEffect(() => {
  //   console.log('AuthInit useEffect called with auth:', auth)

  //   const requestUser = async (apiToken: string) => {
  //     try {
  //       if (!currentUser) {
  //         const {data} = await getUserByToken(apiToken)
  //         if (data) {
  //           console.log('User data received:', data)

  //           setCurrentUser(data)
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error requesting user:', error)

  //       console.error(error)
  //       if (currentUser) {
  //         logout()
  //       }
  //     } finally {
  //       setShowSplashScreen(false)
  //     }
  //   }

  //   if (auth && auth.api_token) {
  //     requestUser(auth.api_token)
  //   } else {
  //     logout()
  //     setShowSplashScreen(false)
  //   }
  //   // eslint-disable-next-line
  // }, [])

  useEffect(() => {
    console.log('AuthInit useEffect called with auth:', auth);
    const requestUser = async (apiToken: string) => {
      try {
        if (!currentUser) {
          const { data } = await getUserByToken(apiToken);
          if (data) {
            console.log('User data received:', data);
            setCurrentUser(data);
          }
        }
      } catch (error) {
        console.error('Error requesting user:', error);
        if (currentUser) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }
    };
  
    if (auth && auth.token) { // Cambio de auth.api_token a auth.token
      requestUser(auth.token);
    } else {
      logout();
      setShowSplashScreen(false);
    }
  }, [auth, currentUser, logout, setCurrentUser]);
  

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export {AuthInit, AuthProvider, useAuth};
