import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

////CARGO EL TRADUCTOR PARA EL VALIDADOR
import './locale/es.js'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
