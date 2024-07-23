import './index.scss';

// import { init } from '@elastic/apm-rum';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';


// init({
//   serviceName: 'Yeebam Client App',
//   serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
//   serviceVersion: '0.0.1',
//   active: true
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
           <App />

  </React.StrictMode>
);
