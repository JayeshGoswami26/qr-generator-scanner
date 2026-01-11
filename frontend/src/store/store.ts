import { configureStore } from '@reduxjs/toolkit';
import qrReducer from './slices/qrSlice';
import scanReducer from './slices/scanSlice';

export const store = configureStore({
  reducer: {
    qr: qrReducer,
    scan: scanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
