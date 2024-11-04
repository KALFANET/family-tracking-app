import React from 'react';
import ReactDOM from 'react-dom/client'; // ייבוא המתאים ל-React 18
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

// אתחול Firebase
initializeApp(firebaseConfig);

// יצירת root חדש ב-React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
