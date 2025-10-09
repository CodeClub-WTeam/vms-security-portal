// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import the router
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap the entire application in the BrowserRouter */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);