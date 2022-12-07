import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAl-WXk4lkrht0LkYj2krcheZ0f4zLzXpg",
  authDomain: "reactblog-pwa.firebaseapp.com",
  projectId: "reactblog-pwa",
  storageBucket: "reactblog-pwa.appspot.com",
  messagingSenderId: "580449994392",
  appId: "1:580449994392:web:71786fe522736050fd32ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
