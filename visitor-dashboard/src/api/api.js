// FILE: src/api/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  // baseURL: 'https://vms.estmac.com/api', // Your backend URL
  validateStatus: (status) => status >= 200 && status < 300
});

// Interceptor to add the auth token to every protected request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;