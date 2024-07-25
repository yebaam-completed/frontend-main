## Freelance Marketplace Application
* This application is built using these main tools
  * `Vite`
  * `React`
  * `Typescript`
  * `Tailwindcss`
  * `Redux Toolkit`
  * `RTK Query`
  * `Stripe`
  * `Elasticsearch`
  * `Axios`
  * `React Router DOM`
  * `React Redux`
  * `React Quill`
  * `SocketIO Client`
  * `ESlint and Prettier`
* There are other tools and packages used.
* You can update the version of `NodeJS` used inside the `Dockerfile`
* Copy contents of `.env.dev` to `.env` file
  * Create an account on `https://stripe.com`
    * Go to developers page to get your api key for the client (it starts with `pk_`)
    * Add the api key to `VITE_STRIPE_KEY`

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/yebaam-frontend .`
  * `docker tag <your-dockerhub-username>/yebaam-frontend <your-dockerhub-username>/yebaam-frontend:stable`
  * `docker push <your-dockerhub-username>/yebaam-frontend:stable`



  import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { getDataFromLocalStorage } from 'src/theme';


const BASE_ENDPOINT = 'http://yeebam-dev.eba-jubbbszd.us-east-1.elasticbeanstalk.com/';
// const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}api/v1`,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return headers;
  },
  credentials: 'include'
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const loggedInUsername: string = getDataFromLocalStorage('loggedInUsername');
    console.log('loggedInUsername',loggedInUsername);
    await baseQuery(`/auth/refresh-token/${loggedInUsername}`, api, extraOptions);
  }
  return result;
};

export const api = createApi({
  reducerPath: 'clientApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Auth', 'Currentuser',  'Chat',  'Notification'],
  endpoints: () => ({})
});


