import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContextProvider } from './store/firebaseContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContextProvider>
        <App />
    </FirebaseContextProvider>
  </React.StrictMode>
);

