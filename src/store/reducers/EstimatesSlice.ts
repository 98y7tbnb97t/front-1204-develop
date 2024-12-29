import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ServerError } from '../../models/response/ServerError';
import { IEstimate } from '../../models/IEstimate';
import EstimatesService from '../../services/EstimatesService';

interface EstimatesSliceState {
  estimates: IEstimate[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EstimatesSliceState = {
  estimates: [],
  status: 'idle',
  error: null,
}

export const createEstimate = createAsyncThunk<IEstimate, IEstimate>( 
  'EstimatesSlice/createEstimate',
  async (estimate, { rejectWithValue }) => { 
    try { 
      const response = await EstimatesService.createEstimate(estimate); 
      return response.data.estimate; 
    } catch (error) { 
      const err = error as AxiosError; 
      const e = err.response?.data as ServerError;
      return rejectWithValue(e); 
    } 
  } 
)

export const getEstimates = createAsyncThunk<IEstimate[], string>( 
  'EstimatesSlice/getEstimates',
  async (searchQuery, { rejectWithValue }) => { 
    try { 
      const response = await EstimatesService.getEstimates(searchQuery); 
      return response.data.estimates; 
    } catch (error) { 
      const err = error as AxiosError; 
      const e = err.response?.data as ServerError;
      return rejectWithValue(e); 
    } 
  } 
)

export const setAdmComment = createAsyncThunk<IEstimate, { 
  estimateId: string,
  reviewId: string,
  admCommentParentsCanSee: boolean,
  admCommentTranerCanSee: boolean,
  admCommentOtherCanSee: boolean,
  parentsCanSee: boolean,
  tranerCanSee: boolean,
  comment: string
}>( 
  'EstimatesSlice/setAdmComment',
  async (params, { rejectWithValue }) => { 
    try { 
      const { 
        estimateId,
        comment,
        reviewId,
        admCommentTranerCanSee,
        admCommentParentsCanSee,
        admCommentOtherCanSee,
        parentsCanSee,
        tranerCanSee
      } = params;
      const response = await EstimatesService.setAdmComment(
        estimateId,
        reviewId,
        admCommentTranerCanSee,
        admCommentParentsCanSee,
        admCommentOtherCanSee,
        parentsCanSee,
        tranerCanSee,
        comment
      ); 
      return response.data.estimate; 
    } catch (error) { 
      const err = error as AxiosError; 
      const e = err.response?.data as ServerError;
      return rejectWithValue(e); 
    } 
  } 
)
const estimatesSlice = createSlice({
  name: 'estimates',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createEstimate.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createEstimate.fulfilled, (state, action) => {
      state.estimates = [...state.estimates, action.payload];
      state.status = 'succeeded';
    });
    builder.addCase(createEstimate.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(getEstimates.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getEstimates.fulfilled, (state, action) => {
      state.estimates = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(getEstimates.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
    builder.addCase(setAdmComment.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(setAdmComment.fulfilled, (state, action) => {
      state.estimates = state.estimates.map(est => est._id === action.payload._id ? action.payload : est);
      state.status = 'succeeded';
    });
    builder.addCase(setAdmComment.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const { setStatus, setError } = estimatesSlice.actions;

export default estimatesSlice.reducer;
