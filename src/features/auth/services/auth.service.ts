import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from 'src/shared/interfaces/shared.interface';
import { ISignInPayload, ISignUpPayload } from 'src/theme/app/modules/auth/interfaces/auth.interface';
import { getDataFromSessionStorage } from 'src/theme/utils/utils.service';

// Obtener el token de autenticación desde el almacenamiento de la sesión
const token = getDataFromSessionStorage('isLoggedIn');

// Definir la URL base para la API
const BASE_ENDPOINT = 'http://yeebam-dev.eba-jubbbszd.us-east-1.elasticbeanstalk.com/';
// const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;

// Configurar la consulta base para la API
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}api/v1`,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    // Si hay un token, agregarlo a los encabezados
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  credentials: 'include'
});

// Crear la instancia de la API usando RTK Query
const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: ['Auth', 'Currentuser', 'Chat', 'Notification'],
  endpoints: (build) => ({
    signUp: build.mutation<IResponse, ISignUpPayload>({
      query(body: ISignUpPayload) {
        return {
          url: '/signup',
          method: 'POST',
          body
        };
      }
    }),
    signIn: build.mutation<IResponse, ISignInPayload>({
      query(body: ISignInPayload) {
        return {
          url: '/signin',
          method: 'POST',
          body
        };
      }
    }),
    logout: build.mutation<IResponse, void>({
      query() {
        return {
          url: '/signout',
          method: 'POST',
          body: {}
        };
      }
    }),
    resendEmail: build.mutation<IResponse, { userId: number; email: string }>({
      query(data) {
        return {
          url: '/resend-email',
          method: 'POST',
          body: data
        };
      }
    }),
    verifyEmail: build.mutation<IResponse, string>({
      query(token: string) {
        return {
          url: '/verify-email',
          method: 'PUT',
          body: { token }
        };
      }
    }),
    verifyOTP: build.mutation<IResponse, { otp: string; browserName: string; deviceType: string }>({
      query(data) {
        return {
          url: `/verify-otp/${data.otp}`,
          method: 'PUT',
          body: {
            browserName: data.browserName,
            deviceType: data.deviceType
          }
        };
      }
    }),
    forgotPassword: build.mutation<IResponse, string>({
      query(email: string) {
        return {
          url: '/forgot-password',
          method: 'PUT',
          body: { email }
        };
      }
    }),
    resetPassword: build.mutation<IResponse, { password: string; confirmPassword: string; token: string }>({
      query(data) {
        return {
          url: `/reset-password/${data.token}`,
          method: 'PUT',
          body: data
        };
      }
    }),
    checkCurrentUser: build.query<IResponse, void>({
      query: () => ({
        url: '/currentuser',
        method: 'GET'
      })
    })
  })
});

export const {
  useCheckCurrentUserQuery,
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useResendEmailMutation,
  useVerifyEmailMutation,
  useVerifyOTPMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
