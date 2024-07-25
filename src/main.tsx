import './index.scss';

// import { init } from '@elastic/apm-rum';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Persistor, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import { store } from './store/store.ts';
import { I18nProvider } from './theme/app/i18n/i18nProvider.tsx';

const persistor: Persistor = persistStore(store);

const queryClient = new QueryClient();
const container = document.getElementById('root');

if (container) {
  ReactDOM.createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <I18nProvider>
            <App />
          </I18nProvider>
        </PersistGate>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Provider>
    </QueryClientProvider>
  );
}
