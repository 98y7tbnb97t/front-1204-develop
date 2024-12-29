import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import BalanceService, {ICreateBalancePayload} from "../../services/BalanceService.ts";
import {AxiosError} from "axios";
import {ServerError} from "../../models/response/ServerError.ts";
import {IRequisite} from "../../models/IRequisite.ts";
import {IChat} from "../../models/IChat.ts";

export interface BalanceState {
    requisites: IRequisite[],
    chatForChecks: IChat | null,
}


const initialState: BalanceState = {
    requisites: [],
    chatForChecks: null,
}

export const getRequisites = createAsyncThunk<{data: IRequisite[],chatForChecks: IChat }>(
    'BalanceSlice/getRequisites',
    async (_, {rejectWithValue}) => {
        try {
            const response = await BalanceService.getRequisites();
            return response.data;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const createRequisite = createAsyncThunk<IRequisite, ICreateBalancePayload>(
    'BalanceSlice/createRequisite',
    async (data, {rejectWithValue}) => {
        try {
            const response = await BalanceService.createRequisite(data);
            return response.data.data;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const editRequisite = createAsyncThunk<IRequisite, {payload: ICreateBalancePayload, id: string}>(
    'BalanceSlice/editRequisite',
    async ({payload,id}, {rejectWithValue}) => {
        try {
            const response = await BalanceService.editRequisite(payload,id);
            return response.data.data;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const deleteRequisite = createAsyncThunk<{ id: string }, {id: string}>(
    'BalanceSlice/deleteRequisite',
    async ({id}, {rejectWithValue}) => {
        try {
            await BalanceService.deleteRequisite(id);
            return {id};
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const BalanceSlice = createSlice({
    name: 'BalanceSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRequisites.fulfilled, (state, { payload }) => {
                state.requisites = payload.data
                state.chatForChecks = payload.chatForChecks
            })
            .addCase(createRequisite.fulfilled, (state, { payload }) => {
                state.requisites = [...state.requisites,payload]
            })
            .addCase(editRequisite.fulfilled, (state, { payload }) => {
                const updatedRequisites = [...state.requisites]
                const updatingItemIndex = updatedRequisites.findIndex(item => item._id === payload._id)

                if(updatingItemIndex !== -1) {
                    updatedRequisites[updatingItemIndex] = {
                        ...updatedRequisites[updatingItemIndex],
                        ...payload
                    }
                }
                state.requisites = updatedRequisites
            })

            .addCase(deleteRequisite.fulfilled, (state, { payload }) => {
                state.requisites = [...state.requisites.filter(item => item._id !== payload.id)]
            })
    }
})

export default BalanceSlice.reducer;
