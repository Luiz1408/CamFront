import axios from 'axios';

// ==========================
// Configuración baseURL
// ==========================
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let logoutHandler = null;

// ==========================
// Permitir setear handler de logout
// ==========================
export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

// ==========================
// Interceptor request: token
// ==========================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// Interceptor response: 401
// ==========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && logoutHandler) {
      logoutHandler();
    }
    return Promise.reject(error);
  }
);

export default api;
