import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the type of makeStore
export type AppStore = typeof store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;