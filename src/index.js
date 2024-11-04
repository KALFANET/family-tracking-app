import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // אם `App` מכילה את הקוד המעודכן להצגת משתמשים
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

// אתחול Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);