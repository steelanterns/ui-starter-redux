import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAction, refreshTokenAction, logoutAction } from './authActions';
import { LoginPayload } from '@/models';
import { verifySession } from '../dal/dal';
import { AuthState } from '@/models';

const initialState: AuthState = {
  username: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<LoginPayload, { username: string; password: string }>(
  'login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await loginAction(username, password);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = (getState() as any).auth;
      return await refreshTokenAction(token);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const checkSession = createAsyncThunk(
  'checkSession',
  async (_, { rejectWithValue }) => {
    try {
      return await verifySession();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      logoutAction();
      state.username = null;
      state.token = null;
      state.refreshToken = null;
      state.expiresAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.username = action.payload.username;
          state.token = action.payload.token;
          // state.refreshToken = action.payload.refreshToken;
          state.expiresAt = action.payload.expiresAt instanceof Date 
            ? action.payload.expiresAt.getTime() 
            : action.payload.expiresAt;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.expiresAt = action.payload.expiresAt;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        // Si le refresh échoue, on déconnecte l'utilisateur
        authSlice.caseReducers.logout(state);
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.expiresAt = action.payload.expiresAt;
      })
      .addCase(checkSession.rejected, (state) => {
        state.username = null;
        state.token = null;
        state.expiresAt = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;