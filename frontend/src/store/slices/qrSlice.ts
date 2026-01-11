import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type QRData, type QRResponse } from '../../types';

interface QRState {
  data: QRData;
  qrCode: string | null;
  dataId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: QRState = {
  data: {},
  qrCode: null,
  dataId: null,
  loading: false,
  error: null,
};

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<QRData>) => {
      state.data = action.payload;
    },
    updateDataKey: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.data[action.payload.key] = action.payload.value;
    },
    removeDataKey: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    },
    clearData: (state) => {
      state.data = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setQRCode: (state, action: PayloadAction<QRResponse>) => {
      state.qrCode = action.payload.qrCode;
      state.dataId = action.payload.dataId;
      state.data = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetQR: (state) => {
      state.qrCode = null;
      state.dataId = null;
      state.error = null;
    },
  },
});

export const {
  setData,
  updateDataKey,
  removeDataKey,
  clearData,
  setLoading,
  setQRCode,
  setError,
  resetQR,
} = qrSlice.actions;

export default qrSlice.reducer;
