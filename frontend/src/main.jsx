import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { configureStore } from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
// import all exports from session file into one object
import * as sessionActions from './store/session';

import { Modal, ModalProvider } from './Context/Modal';

// initialize Redux store 
const store = configureStore();

// in dev, make store accessible to the global browser scope so developers can inspect it
// if(process.env.NODE_ENV !== 'production'){
//   window.store = store;
// }

// in dev, call restoreCSRF to set csrf token on frontend routes
if(import.meta.env.MODE !== 'production'){
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// AlertProvider configuration
const alertOptions = {
  position: positions.TOP_CENTER, 
  timeout: 5000,                  
  offset: '30px',                 
  transition: transitions.SCALE, 
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <App />
          <Modal />
        </AlertProvider>
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);


