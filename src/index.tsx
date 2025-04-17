import React from 'react';
import ReactDOM from 'react-dom';
import './mock';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './components/AppContainer';

/**
 * This file can be ignored, please work in ./components/App.tsx
 */

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
