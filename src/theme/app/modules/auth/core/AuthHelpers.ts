/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthModel} from './_models';

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v';
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    console.log('AUTH_LOCAL_STORAGE_KEY',getAuth);
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      console.log('auth-AuthModel',auth);

      return auth;
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth();
      // console.log('setupAxios',auth)
      // if (auth && auth.api_token) {
      //   config.headers.Authorization = `Bearer ${auth.api_token}`
      // }
      if (auth && auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

export {AUTH_LOCAL_STORAGE_KEY,getAuth, removeAuth, setAuth};
