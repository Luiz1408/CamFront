import axios from 'axios';

const api = axios.create({
  baseURL: 'https://luiz1432-001-site1.site4future.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let logoutHandler = null;

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

// REQUEST → agrega token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE → maneja 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof logoutHandler === 'function') {
      logoutHandler();
    }
    return Promise.reject(error);
  }
);

export default api;
