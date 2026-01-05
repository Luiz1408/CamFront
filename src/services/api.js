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
// Interceptor request: agrega token
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
// Interceptor response: maneja 401
// ==========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof logoutHandler === 'function') {
      logoutHandler();
    }
    return Promise.reject(error);
  }
);

// ==========================
// Funciones de la API (Usuarios, Folios, Revisiones, etc.)
// ==========================
export const getUsersByRole = async (role) => {
  const response = await api.get(`/User/role/${role}`);
  return response.data.map(user => ({
    id: user.id,
    valor: user.fullName,
    username: user.username,
    firstName: user.firstName || '',
    lastName: user.lastName || ''
  }));
};

export const getSiguienteFolio = async (tipo) => {
  const response = await api.get(`/Folios/siguiente-folio/${tipo}`);
  return response.data;
};

export const getAlmacenUbicacionFolios = async () => {
  const response = await api.get('/AlmacenUbicacionFolio');
  return response.data;
};

export const createAlmacenUbicacionFolio = async (data) => {
  const response = await api.post('/AlmacenUbicacionFolio', data);
  return response.data;
};

export const updateAlmacenUbicacionFolio = async (id, data) => {
  const response = await api.put(`/AlmacenUbicacionFolio/${id}`, data);
  return response.data;
};

export const deleteAlmacenUbicacionFolio = async (id) => {
  const response = await api.delete(`/AlmacenUbicacionFolio/${id}`);
  return response.data;
};

export const getRevisiones = async () => {
  const response = await api.get('/CapturaRevisiones');
  return response.data;
};

export const createRevision = async (revisionData) => {
  const response = await api.post('/CapturaRevisiones', revisionData);
  return response.data;
};

export const updateRevision = async (id, revisionData) => {
  const response = await api.put(`/CapturaRevisiones/${id}`, revisionData);
  return response.data;
};

export const deleteRevision = async (id) => {
  const response = await api.delete(`/CapturaRevisiones/${id}`);
  return response.data;
};

// ==========================
// Export default
// ==========================
export default api;
