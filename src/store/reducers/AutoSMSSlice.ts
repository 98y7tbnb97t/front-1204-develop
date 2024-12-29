import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAutoSMS } from '../../models/IAutoSMS';
import AutoSMSService from '../../services/AutoSMSService';
import { AxiosError } from 'axios';
import { ServerError } from '../../models/response/ServerError';

interface AutoSMSSliceState {
  autoSMSList: IAutoSMS[];
  autoSMS: IAutoSMS | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AutoSMSSliceState = {
  autoSMS: null,
  autoSMSList: [],
  status: 'idle',
  error: null,
}

export const createAutoSMS = createAsyncThunk<IAutoSMS, Omit<IAutoSMS, '_id'>>( 
    'AutoSMSSlice/createAutoSMS',
    async (autoSMS, { rejectWithValue }) => { 
        try { 
            const response = await AutoSMSService.createAutoSMS(autoSMS); 
            return response.data; 
        } catch (error) { 
            const err = error as AxiosError; 
            const e = err.response?.data as ServerError;
            return rejectWithValue(e); 
        } 
    } 
)

export const editAutoSMS = createAsyncThunk<IAutoSMS, IAutoSMS>( 
    'AutoSMSSlice/editAutoSMS',
    async (autoSMS, { rejectWithValue }) => { 
        try { 
            const response = await AutoSMSService.editAutoSMS(autoSMS); 
            return response.data; 
        } catch (error) { 
            const err = error as AxiosError; 
            const e = err.response?.data as ServerError;
            return rejectWithValue(e); 
        } 
    } 
)

export const getAllAutoSMS = createAsyncThunk<IAutoSMS[], { dialog_id?: string, user_id?: string, isPrivate?: boolean, isForDialogs?: boolean, isForGroups?: boolean, isForHomeworks?: boolean }>( 
    'AutoSMSSlice/getAllAutoSMS', 
    async ({ dialog_id, user_id, isPrivate, isForDialogs, isForGroups, isForHomeworks }, { rejectWithValue }) => { 
        try { 
            const response = await AutoSMSService.getAllAutoSMS({ dialog_id, user_id, isPrivate, isForDialogs, isForGroups, isForHomeworks }); 
            return response.data; 
        } catch (error) { 
            const err = error as AxiosError; 
            const e = err.response?.data as ServerError 
            return rejectWithValue(e); 
        } 
    } 
)

export const getSchoolAutoSMS = createAsyncThunk<IAutoSMS[]>( 
    'AutoSMSSlice/getSchoolAutoSMS', 
    async (_, { rejectWithValue }) => { 
        try { 
            const response = await AutoSMSService.getSchoolAutoSMS(); 
            return response.data; 
        } catch (error) { 
            const err = error as AxiosError; 
            const e = err.response?.data as ServerError 
            return rejectWithValue(e); 
        } 
    } 
)

export const toggleAutoSMS = createAsyncThunk<IAutoSMS, { autoSMSId: string, enabled: boolean }>( 
    'AutoSMSSlice/toggleAutoSMS', 
    async ({ autoSMSId, enabled }, { rejectWithValue }) => { 
        try { 
            const response = await AutoSMSService.toggleAutoSMS(autoSMSId, enabled); 
            return response.data; 
        } catch (error) { 
            const err = error as AxiosError; 
            const e = err.response?.data as ServerError 
            return rejectWithValue(e); 
        } 
    } 
)

export const deleteAutoSMS = createAsyncThunk<IAutoSMS, string>( 
    'AutoSMSSlice/deleteAutoSMS', 
    async (autoSMSId, { rejectWithValue }) => { 
        try { 
            const response = await AutoSMSService.deleteAutoSMS(autoSMSId); 
            return response.data; 
        } catch (error) { 
            const err = error as AxiosError; 
            const e = err.response?.data as ServerError 
            return rejectWithValue(e); 
        } 
    } 
)

const autoSMSSlice = createSlice({
  name: 'autoSMS',
  initialState,
  reducers: {
    setAutoSMSList(state, action: PayloadAction<IAutoSMS[]>) {
      state.autoSMSList = action.payload;
    },
    setStatus(state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAutoSMS.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createAutoSMS.fulfilled, (state, action) => {
      state.autoSMSList = [...state.autoSMSList, action.payload];
      state.status = 'succeeded';
    });
    builder.addCase(createAutoSMS.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(editAutoSMS.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(editAutoSMS.fulfilled, (state, action) => {
      state.autoSMSList = state.autoSMSList?.map(autoSMS => autoSMS._id === action.payload._id ? action.payload : autoSMS);
      state.status = 'succeeded';
    });
    builder.addCase(editAutoSMS.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(getAllAutoSMS.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllAutoSMS.fulfilled, (state, action) => {
      state.autoSMSList = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(getAllAutoSMS.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(getSchoolAutoSMS.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getSchoolAutoSMS.fulfilled, (state, action) => {
      state.autoSMSList = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(getSchoolAutoSMS.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(toggleAutoSMS.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(toggleAutoSMS.fulfilled, (state, action) => {
      state.autoSMSList = state.autoSMSList?.map(autoSMS => autoSMS._id === action.payload._id ? action.payload : autoSMS);
      state.status = 'succeeded';
    });
    builder.addCase(toggleAutoSMS.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(deleteAutoSMS.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteAutoSMS.fulfilled, (state, action) => {
      state.autoSMSList = state.autoSMSList?.filter(autoSMS => autoSMS._id !== action.payload._id);
      state.status = 'succeeded';
    });
    builder.addCase(deleteAutoSMS.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { setAutoSMSList, setStatus, setError } = autoSMSSlice.actions;

export default autoSMSSlice.reducer;
