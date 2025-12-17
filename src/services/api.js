import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' 
    ? 'https://luiz1432-001-site1.site4future.com/api'
    : '/api'),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
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

// Función para obtener usuarios por rol
export const getUsersByRole = async (role) => {
  try {
    const response = await api.get(`/User/role/${role}`);
    return response.data.map(user => ({
      id: user.id,
      valor: user.fullName,
      username: user.username,
      firstName: user.firstName || '',
      lastName: user.lastName || ''
    }));
  } catch (error) {
    console.error(`Error obteniendo usuarios con rol ${role}:`, error);
    throw error;
  }
};

// Función para obtener el siguiente folio
export const getSiguienteFolio = async (tipo) => {
  try {
    const response = await api.get(`/Folios/siguiente-folio/${tipo}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo siguiente folio para ${tipo}:`, error);
    throw error;
  }
};

// Función para obtener catálogo de almacenes con folios y ubicaciones
export const getAlmacenUbicacionFolios = async () => {
  try {
    const response = await api.get('/AlmacenUbicacionFolio');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo catálogo de almacenes:', error);
    throw error;
  }
};

// Función para crear almacén-ubicación-folio
export const createAlmacenUbicacionFolio = async (data) => {
  try {
    const response = await api.post('/AlmacenUbicacionFolio', data);
    if (!response.data) {
      throw new Error('No se recibieron datos en la respuesta');
    }
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creando almacén-ubicación-folio:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Error al crear el almacén-ubicación-folio';
    return { success: false, error: errorMessage };
  }
};

// Función para actualizar almacén-ubicación-folio
export const updateAlmacenUbicacionFolio = async (id, data) => {
  try {
    const response = await api.put(`/AlmacenUbicacionFolio/${id}`, data);
    if (!response.data) {
      throw new Error('No se recibieron datos en la respuesta');
    }
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error actualizando almacén-ubicación-folio:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Error al actualizar el almacén-ubicación-folio';
    return { success: false, error: errorMessage };
  }
};

// Función para eliminar almacén-ubicación-folio
export const deleteAlmacenUbicacionFolio = async (id) => {
  try {
    const response = await api.delete(`/AlmacenUbicacionFolio/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando almacén-ubicación-folio:', error);
    throw error;
  }
};

// Funciones para manejar Revisiones
export const getRevisiones = async () => {
  try {
    const response = await api.get('/CapturaRevisiones');
    return response.data;
  } catch (error) {
    console.error('Error al obtener revisiones:', error);
    throw error;
  }
};

export const createRevision = async (revisionData) => {
  try {
    const response = await api.post('/CapturaRevisiones', revisionData);
    return response.data;
  } catch (error) {
    console.error('Error al crear revisión:', error);
    throw error;
  }
};

export const updateRevision = async (id, revisionData) => {
  try {
    const response = await api.put(`/CapturaRevisiones/${id}`, revisionData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar revisión:', error);
    throw error;
  }
};

export const deleteRevision = async (id) => {
  try {
    const response = await api.delete(`/CapturaRevisiones/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando revisión:', error);
    throw error;
  }
};

export default api;
