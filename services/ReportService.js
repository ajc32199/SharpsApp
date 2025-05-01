import axios from 'axios';

const API_URL = 'https://sharpsappbackend.onrender.com';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const ReportService = {
  async getReports() {
    try {
      const response = await instance.get('/reports');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      throw error;
    }
  },

  async createReport(payload) {
    try {
      const response = await instance.post('/reports', payload);
      return response.data;
    } catch (error) {
      console.error('Failed to create report:', error);
      throw error;
    }
  },

  async updateReportStatus(id, reportStatus) {
    try {
      const response = await instance.patch(`/reports/${id}`, { reportStatus });
      return response.data;
    } catch (error) {
      console.error('Failed to update report status:', error);
      throw error;
    }
  },

  async updateReportPhotoUrl(id, image) {
    try {
      const response = await instance.patch(`/reports/${id}`, { image });
      return response.data;
    } catch (error) {
      console.error('Failed to update report photo URL:', error);
      throw error;
    }
  }
};
