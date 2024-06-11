import React from 'react'
import ReactDOM from 'react-dom/client'


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/main.css';

import Routings from './routing';
import { Provider } from 'react-redux';
import { ThemeProviders } from './config/theme.config';
import store from './store';

const root = document.getElementById("root")
const rootElem = ReactDOM.createRoot(root)

rootElem.render(
  <React.StrictMode>
    <ThemeProviders>
      <Provider store={store}>
        <Routings/>
      </Provider>
    </ThemeProviders>
  </React.StrictMode>
)