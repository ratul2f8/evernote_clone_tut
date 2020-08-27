import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyC7QuQq0hTW7D-AgLnNGws1y9274HiY5dg",
  authDomain: "notetakingapptut.firebaseapp.com",
  databaseURL: "https://notetakingapptut.firebaseio.com",
  projectId: "notetakingapptut",
  storageBucket: "notetakingapptut.appspot.com",
  messagingSenderId: "407651057979",
  appId: "1:407651057979:web:0d349e8347a1576dd9771e",
  measurementId: "G-KRYFZF3MQT"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('note-taking-app-root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
