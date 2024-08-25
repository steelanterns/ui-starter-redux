import axios from 'axios';
import { store } from '../store/store';
import { refreshToken } from '../store/authSlice';

const api = axios.create({
  baseURL: 'http://localhost:9000',
});

api.interceptors.request.use((config) => {
  const { token, username } = store.getState().auth;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (username) {
    config.headers['X-Username'] = username;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Token expired' && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await store.dispatch(refreshToken());
          const { token, username } = store.getState().auth;
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          if (username) {
            originalRequest.headers['X-Username'] = username;
          }
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;