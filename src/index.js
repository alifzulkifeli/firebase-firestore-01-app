import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import firebase from './utils/firebase';

ReactDOM.render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
  document.getElementById('root')
);

