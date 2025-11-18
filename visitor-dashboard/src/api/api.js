import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',  
  // Example:
  // VITE_API_BASE_URL = https://vms.estmac.com/api
  // or for local:
  // VITE_API_BASE_URL = http://localhost:5000/api

  validateStatus: (status) => status >= 200 && status < 300
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
