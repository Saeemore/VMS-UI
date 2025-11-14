// FILE: src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomToastProvider } from './context/CustomToastContext'; // <-- 1. IMPORT the new provider

// REMOVED: import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CustomToastProvider> {/* <-- 2. WRAP your App component */}
            <App />
          </CustomToastProvider>
          {/* REMOVED the old <Toaster /> component from here */}
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);