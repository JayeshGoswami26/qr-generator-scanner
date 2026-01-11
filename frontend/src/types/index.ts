export interface KeyValuePair {
  key: string;
  value: string;
}

export interface QRData {
  [key: string]: string;
}

export interface QRResponse {
  success: boolean;
  qrCode: string;
  dataId: string;
  data: QRData;
}

export interface ScannedData {
  data: QRData;
  valid: boolean;
  error?: string;
}

export type AppMode = 'generate' | 'scan';
