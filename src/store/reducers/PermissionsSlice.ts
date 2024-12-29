import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import {ICounter} from "../../models/ICounter.ts";
import PermissionsService from "../../services/PermissionsService.ts";
import {AxiosError} from "axios";
import {ServerError} from "../../models/response/ServerError.ts";

export interface PermissionsState {
    counter: ICounter,
    countersRecived: boolean,
}


const initialState: PermissionsState = {
   counter: {
       all: 0,
       newTrainers: 0,
       newStudents: 0,
       students: 0,
       trainers: 0,
       admins: 0,
       programmers: 0,
       archive: 0,
       newTrainersEdited: 0,
       newStudentsEdited: 0,
       studentsEdited: 0,
       studentsRequisiteEdited: 0,
       trainersEdited: 0,
       adminsEdited: 0,
       debtors: 0,
       archiveStudents: 0,
       allStudents: 0,
       testUsers: 0
   },
    countersRecived: false,

}

export const getCounters = createAsyncThunk<ICounter>(
    'PermissionsSlice/getCounters',
    async (_, {rejectWithValue}) => {
        try {
            const response = await PermissionsService.getCounter();
            return response.data.counters;
        } catch ( error ) {
            const err = error as AxiosError;
            const e = err.response?.data as ServerError
            return rejectWithValue(e);
        }
    }
)

export const PermissionsSlice = createSlice({
    name: 'PermissionsSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCounters.fulfilled, (state, { payload }) => {
                const counters = payload
                state.counter = counters
                state.countersRecived = true
            })
    }


})

export default PermissionsSlice.reducer;
