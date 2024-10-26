import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';

// initialize Redux store 
const store = configureStore();

// in dev, make store accessible to the global browser scope so developers can inspect it
if(process.env.NODE_ENV !== 'production'){
  window.store = store;
}

// in dev, call restoreCSRF to set csrf token on frontend routes
if(import.meta.env.MODE !== 'production'){
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
