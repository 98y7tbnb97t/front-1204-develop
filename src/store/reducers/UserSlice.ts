import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../http';
import { User } from '../../models/User';
import { AuthResponse } from '../../models/response/AuthResponse';
import { EditUserReQData } from '../../models/response/EditUserReqData.ts';
import { IeditChatTag } from '../../models/response/MessengerResponses';
import { ServerError } from '../../models/response/ServerError';
import AuthService from '../../services/AuthService';
import DialogService from '../../services/DialogService';
import { UserRoles } from '../../utils/userRoles.ts';
import { TestUser } from '../../models/TestUser.ts';

export interface UserState {
  user: User;
  isAuth: boolean;
  isLoading: boolean;
  users: User[];
  testUser: TestUser;
}

const initialState: UserState = {
  user: {} as User,
  isAuth: false,
  isLoading: true,
  users: [],
  testUser: {} as TestUser,
};

export const registration = createAsyncThunk<
  User,
  { email: string; name: string; sname: string; password: string }
>('userSlice/registration', async (user, { rejectWithValue }) => {
  try {
    const { email, name, sname, password } = user;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await AuthService.registration(
      email,
      name,
      sname,
      password,
      timeZone
    );
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const registrationTestUser = createAsyncThunk<
  TestUser,
  { name: string, sname: string, test_lesson_id: string }
>('userSlice/registrationTestUser', async (user, { rejectWithValue }) => {
  try {
    const response = await AuthService.registrationTestUser(user.name, user.sname, user.test_lesson_id);
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const login = createAsyncThunk<
  { user: User },
  { email: string; password: string }
>('userSlice/login', async (user, { rejectWithValue }) => {
  try {
    const { email, password } = user;
    const response = await AuthService.login(email, password);
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('error', '');
    return { user: response.data.user };
  } catch (error) {
    const error__message = localStorage.getItem('error');
    const e = error__message as unknown as ServerError;
    return rejectWithValue(e);
  }
});
export const login_lichess = createAsyncThunk<User>(
  'userSlice/login_lichess',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.login_lichess();
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('error', '');
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const checkAuth = createAsyncThunk<User>(
  'userSlice/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(
        `${API_URL}/service1/auth/refresh`,
        { withCredentials: true },
      );
      localStorage.setItem('token', response.data.accessToken);
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!response.data.user.timeZone) {
        await AuthService.setTimeZone(timeZone);
        response.data.user.timeZone = timeZone;
      }
      if (response.data.user.browserTimeZone !== timeZone) {
        await AuthService.setBrowserTimeZone(timeZone);
        response.data.user.browserTimeZone = timeZone;
      }
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e.error);
    }
  },
);

export const getUsers = createAsyncThunk('userSlice/getUsers', async () => {
  try {
    const response = await AuthService.getUsers();
    return response.data.users;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    throw e;
  }
});
export const editlevel = createAsyncThunk(
  'userSlice/editLevel',
  async (data) => {
    try {
      const response = await AuthService.editlevel(data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);

export const logout = createAsyncThunk<boolean>(
  'userSlice/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('tokenFCM');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e.error);
    }
  },
);

export const editUser = createAsyncThunk<User, EditUserReQData>(
  'userSlice/editUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await AuthService.editUser(user);
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const deleteAcceptedRequests = createAsyncThunk<
  User,
  { id: string; isRequisite?: boolean }
>(
  'userSlice/deleteAcceptedRequests',
  async ({ id, isRequisite }, { rejectWithValue }) => {
    try {
      const response = await AuthService.deleteAcceptedRequests(
        id,
        isRequisite,
      );
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const setRequizits = createAsyncThunk<User, string>(
  'userSlice/setRequizits',
  async (type, { rejectWithValue }) => {
    try {
      const response = await AuthService.setRequizits(type);
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const setTimeZone = createAsyncThunk<User, string>(
  'userSlice/setTimeZone',
  async (timeZone, { rejectWithValue }) => {
    try {
      const response = await AuthService.setTimeZone(timeZone);
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const editChatTag = createAsyncThunk<
  IeditChatTag,
  { dialog_id: string; name: string }
>('userSlice/editChatTag', async (user, { rejectWithValue }) => {
  try {
    const { dialog_id, name } = user;
    const response = await DialogService.editChatTag(dialog_id, name);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const switchUser = createAsyncThunk<{ user: User }, string>(
  'userSlice/switchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await AuthService.switchUser(userId);
      localStorage.setItem('token', response.data.accessToken);
      return { user: response.data.user };
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    storeLoad(state) {
      state.isLoading = false;
    },
    authUser(state, action: PayloadAction<User>) {
      state.user = {
        _id: (Date.now() + Math.random()).toString(),
        name: action.payload.name,
        sname: action.payload.sname,
        tname: '',
        role: UserRoles.STUDENT,
        email: '',
        scheduleEditHistory: [],
        isOnline: true
      };
    },
    editUserNameAuth(state, action: PayloadAction<User>) {
      state.user.name = action.payload.name;
    },
    editTestUserNameAuth(state, action: PayloadAction<{name: string, sname: string}>) {
      state.testUser.name = action.payload.name;
      state.testUser.sname = action.payload.sname;
    },
    editUserAccess(state, action: PayloadAction<boolean>) {
      state.user.access = action.payload;
    },
    editTrustLesson(state, action: PayloadAction<boolean>) {
      state.user.trustLesson = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload;
      })
      .addCase(registration.rejected, (_, { payload }) => {})
      .addCase(registrationTestUser.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.testUser = payload;
      })
      .addCase(registrationTestUser.rejected, (_, { payload }) => {})
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.isAuth = true;
          state.user = action.payload.user;
        },
      )
      .addCase(login.rejected, (_, { payload }) => {})
      .addCase(login_lichess.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload;
      })
      .addCase(login_lichess.rejected, (_, { payload }) => {})
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.email) {
          state.user = action.payload;
        } else {
          state.testUser = action.payload as unknown as TestUser;
        }
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(deleteAcceptedRequests.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = {} as User;
      })
      .addCase(logout.rejected, (_, { payload }) => {})
      .addCase(editChatTag.fulfilled, (state, { payload }) => {
        state.user.dialog_types = payload.dialog_types;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(setRequizits.fulfilled, (state, { payload }) => {
        state.user.requizits = payload.requizits;
      })
      .addCase(setTimeZone.fulfilled, (state, { payload }) => {
        state.user.timeZone = payload.timeZone;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addCase(
        switchUser.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.isAuth = true;
          state.user = action.payload.user;
        },
      );
  },
});

export default userSlice.reducer;
export const { authUser, editUserNameAuth, editUserAccess, editTrustLesson, editTestUserNameAuth } = userSlice.actions;
