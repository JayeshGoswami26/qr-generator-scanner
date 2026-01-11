import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type QRData, type ScannedData } from '../../types';

interface ScanState {
  scannedData: QRData | null;
  loading: boolean;
  error: string | null;
  isValid: boolean;
}

const initialState: ScanState = {
  scannedData: null,
  loading: false,
  error: null,
  isValid: false,
};

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setScannedData: (state, action: PayloadAction<ScannedData>) => {
      if (action.payload.valid) {
        state.scannedData = action.payload.data;
        state.isValid = true;
        state.error = null;
      } else {
        state.error = action.payload.error || 'Invalid QR code data';
        state.scannedData = null;
        state.isValid = false;
      }
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.isValid = false;
      state.scannedData = null;
    },
    resetScan: (state) => {
      state.scannedData = null;
      state.error = null;
      state.isValid = false;
      state.loading = false;
    },
  },
});

export const { setLoading, setScannedData, setError, resetScan } = scanSlice.actions;

export default scanSlice.reducer;
