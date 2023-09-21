import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataProvider from './dataContext/DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//firebase files

import { initializeApp } from "firebase/app"
// import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.RREACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  // databaseURL: 'YOUR_DATABASE_URL', use only if I'm using realtime storage instead of firestore
  // storageBucket: 'YOUR_STORAGE_BUCKET', if using Firebase Storage
  // messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  // appId: 'YOUR_APP_ID',
}
export const app = initializeApp(firebaseConfig)

// const app = initializeApp(firebaseConfig);
// export const database = getFirestore(app)

//firebase files


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path='/*' Component={App} />
        </Routes>
      </Router>
    </DataProvider>
  </React.StrictMode>
);
