import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';
import appReducer from './appSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
    app: appReducer,
    auth: authReducer
  },
});
