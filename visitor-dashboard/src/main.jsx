// FILE: src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- 1. Import the Router here
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomToastProvider } from '../src/components/CustomToastContext.jsx'; // <-- 3. Import the CustomToastProvider  
import App from './App';
import './index.css';

// Create a client for React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* --- 2. Wrap your entire app in all providers --- */}
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CustomToastProvider>
          <App /> 
        </CustomToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);