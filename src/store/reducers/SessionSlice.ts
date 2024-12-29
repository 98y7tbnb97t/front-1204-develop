import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ServerError } from '../../models/response/ServerError';
import { SessionResponse } from '../../models/response/SessionResponse';
import UserSessionService from '../../services/UserSessionService';

interface SessionState {
  session: SessionResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  session: null,
  isLoading: false,
  error: null,
};

export const getSession = createAsyncThunk<SessionResponse, string>(
  'sessionSlice/getSession',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserSessionService.getSession(userId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;

      return rejectWithValue(e);
    }
  },
);

export const createSession = createAsyncThunk<SessionResponse, string>(
  'sessionSlice/createSession',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserSessionService.createSession(userId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const addUserToSession = createAsyncThunk<
  SessionResponse,
  { sessionId: string; userId: string }
>(
  'sessionSlice/addUserToSession',
  async ({ sessionId, userId }, { rejectWithValue }) => {
    try {
      const response = await UserSessionService.addUserToSession(
        sessionId,
        userId,
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const removeUserFromSession = createAsyncThunk<SessionResponse, string>(
  'sessionSlice/removeUserFromSession',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserSessionService.removeUserFromSession(userId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const sessionSlice = createSlice({
  name: 'sessionSlice',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionResponse | null>) {
      state.session = action.payload;
    },
    clearSession(state) {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.session = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? String(action.payload)
          : 'Ошибка при получении сессии';
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.session = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addUserToSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserToSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload;
      })
      .addCase(addUserToSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? String(action.payload)
          : 'Ошибка добавления пользователя в сессию';
      })
      .addCase(removeUserFromSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUserFromSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload;
      })
      .addCase(removeUserFromSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? String(action.payload)
          : 'Ошибка удаления пользователя из сессии';
      });
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
