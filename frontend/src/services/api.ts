import axios from 'axios';
import { type QRData, type QRResponse, type ScannedData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateQRCode = async (data: QRData): Promise<QRResponse> => {
  const response = await api.post<QRResponse>('/qr/generate', { data });
  return response.data;
};

export const getQRById = async (id: string): Promise<QRResponse> => {
  const response = await api.get<QRResponse>(`/qr/${id}`);
  return response.data;
};

export const validateScannedData = async (scannedData: string): Promise<ScannedData> => {
  const response = await api.post<ScannedData>('/qr/validate', { scannedData });
  return response.data;
};

export default api;
