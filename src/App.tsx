import { FC, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppRouter from './AppRoutes';

const App: FC = (): ReactElement => {

  return (
    <>
      <BrowserRouter>
        <div>
          <AppRouter />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
