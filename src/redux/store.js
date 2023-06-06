import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice'
import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
    app: appReducer
  },
});
