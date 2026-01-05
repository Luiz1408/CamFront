import api from './api';

export const dashboardService = {
  // Obtener métricas principales
  async getMetrics() {
    const response = await api.get('/Dashboard/metrics');
    return response.data;
  },

  // Obtener resumen diario
  async getDailySummary() {
    const response = await api.get('/Dashboard/summary');
    return response.data;
  },

  // Obtener estadísticas generales
  async getGeneralStats() {
    const response = await api.get('/Dashboard/stats');
    return response.data;
  }
};
