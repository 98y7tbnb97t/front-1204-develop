import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServerError } from '../../models/response/ServerError';
import SeansService from '../../services/SeansService.ts';
import { AxiosError } from 'axios';
import {
  acceptToSeansSocket,
  createSeansSocket,
  joinSeansSocket,
  kickFromSeansSocket,
  leaveSeansSocket,
  seansPlaying,
  startSeansSocket,
  updateSeansGameSocket,
} from '../../sockets/SeansSockets.ts';
import { ChatRoomDisconnectSocket } from '../../sockets/MessengerSockets.ts';
import { Square } from 'chess.js';
import { seansPlayingData, seansResultsReq, seansUpdateGameData } from '../../models/seans/Seans.ts';

export interface UserState {
  added: boolean;
  isLoading: boolean;
  seansList: any[];
  studentJoinLoading: boolean;
  oneSeansLoading: boolean;
  oneSeans: any;

  loadingSessionsResults: boolean;
  sessionsResults: any[];

  autoChange:boolean;
  createFormData: any;
}

const initialState: UserState = {
  added: false,
  isLoading: true,
  seansList: [],

  studentJoinLoading: false,
  oneSeansLoading: false,
  oneSeans: null,

  loadingSessionsResults: false,
  sessionsResults: [],
  autoChange: false,
  createFormData: {}
};

export const getAllSeans = createAsyncThunk('seans/getAll', async (data:{teacherId?:string; groupId?:string}) => {
  try {
    const response = await SeansService.getAllSeans(data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    throw e;
  }
});
export const getOneSeans = createAsyncThunk(
  'seans/getone',
  async (data: string | undefined) => {
    try {
      const response = await SeansService.getOneSeans(data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);
export const createSeans = createAsyncThunk(
  'seans/create',
  async (data: any, { getState }) => {
    try {
      // // @ts-ignore
      // const { user } = getState().UserSlice;
      const response = await SeansService.createSeans({
        ...data,
        // seanser: user._id,
      });

      createSeansSocket(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);
export const createTournament = createAsyncThunk(
  'tournament/create',
  async (data:any, {getState}) => {
    try {
      // @ts-ignore
      const {user} = getState().UserSlice;
      const response = await SeansService.createSeans({...data, seanser: {firstName: user?.name, lastName: user?.sname} });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  }
);
export const studentJoin = createAsyncThunk(
  'seans/student-join',
  async (seansId: string | undefined, { getState }) => {
    try {
      // @ts-ignore
      const { user } = getState().UserSlice;
      const response = await SeansService.studentJoin({
        seansId: seansId,
        studentId: user._id,
      });
      joinSeansSocket({ seansId: seansId, data: response.data });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);
export const leaveSeans = createAsyncThunk(
  'seans/student-leave',
  async (seansId: string | undefined, { getState }) => {
    try {
      // @ts-ignore
      const { user } = getState().UserSlice;
      const response = await SeansService.leaveTheSeans({
        seansId: seansId,
        studentId: user._id,
      });
      leaveSeansSocket({ seansId, data: response.data });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);
export const acceptPlayerToSeans = createAsyncThunk(
  'seans/student-accept',
  async (data: any, { getState }) => {
    try {
      // @ts-ignore
      // const { user } = getState().UserSlice;
      const response = await SeansService.acceptPlayer({
        seansId: data.seansId,
        studentId: data.studentId,
        startPosition: data.startPosition,
      });

      acceptToSeansSocket({ seansId: data.seansId, data: response.data });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);
export const kickFromToSeans = createAsyncThunk(
  'seans/student-kick',
  async (data: any, { getState }) => {
    try {
      // @ts-ignore
      // const { user } = getState().UserSlice;
      const response = await SeansService.kickPlayer({
        seansId: data.seansId,
        studentId: data.studentId,
      });

      kickFromSeansSocket({ seansId: data.seansId, data: response.data });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);
export const startSeans = createAsyncThunk(
  'seans/start',
  async ({seansId, playings}:{seansId: string | undefined;playings:number}, { getState }) => {
    try {
      // @ts-ignore
      const { user } = getState().UserSlice;
      // // @ts-ignore
      // const { oneSeans } = getState().seansSlice;
      const response = await SeansService.startSeans({
        seansId,
        playings
        // studentId: user._id,
      });
      startSeansSocket({ seansId: seansId, data: response.data });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);
export const moveInSeans = createAsyncThunk(
  'seans/moveing',
  async (data: seansPlayingData, { getState }) => {
    try {
      // @ts-ignore
      const { user } = getState().UserSlice;
      const response = await SeansService.moveSeans(data);
      
      seansPlaying(data);

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);


export const seansUpdateGame = createAsyncThunk(
  'seans/updategame',
  async (data: seansUpdateGameData, { getState }) => {
    try {
      // @ts-ignore
      const { user } = getState().UserSlice;
      const response = await SeansService.seansUpdateGame(data);
      

      const d = {
        status: response.data.status,
        playings: response.data.playings,
        wins: response.data.wins,
        defeats: response.data.deafeats,
        draws: response.data.draws
      }

      updateSeansGameSocket(d);

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      throw e;
    }
  },
);

export const seansResults = createAsyncThunk('seans/results', async (data:seansResultsReq) => {
  try {
    const response = await SeansService.seansResults(data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    throw e;
  }
});

export const SeansSlice = createSlice({
  name: 'seansSlice',
  initialState,
  reducers: {
    setSeansList(state, action) {
      state.seansList = action.payload;
    },
    pushSeansList(state, action) {
      // state.seansList.push(action.payload);
      state.seansList.unshift(action.payload);
    },
    setOneSeans(state, action) {
      state.oneSeans = action.payload;
    },
    // 
    setMoves(state,{payload}){
      const game = state.oneSeans.games.find((e:any)=>e.user._id===payload.userId);
      game.moves.push(payload.move)
    },
    setWhiteCaptures(state,{payload}){
      const game = state.oneSeans.games.find((e:any)=>e.user._id===payload.userId);
      game.whiteCaptures.push(payload.capture)
    },
    setBlackCaptures(state,{payload}){
      const game = state.oneSeans.games.find((e:any)=>e.user._id===payload.userId);
      game.blackCaptures.push(payload.capture)
    },

    setOneGame(state,{payload}){
      let currentGame = state.oneSeans.games.find((e:any)=>e.user._id===payload.userId);
      currentGame.fen = payload.fen;
      currentGame.whiteTimer = payload.whiteTimer;
      currentGame.blackTimer = payload.blackTimer;
    },
    setOneGameTimer(state,{payload}){
      let currentGame = state.oneSeans.games.find((e:any)=>e.user._id===payload.userId);
      currentGame.whiteTimer = payload.whiteTimer;
      currentGame.blackTimer = payload.blackTimer;
      currentGame.timerGoingOn = payload.timerGoingOn
    },
    setSeansUpdate(state, {payload}){
        state.oneSeans.playings = payload.statusCount.playings;
        state.oneSeans.wins = payload.statusCount.wins;
        state.oneSeans.draws = payload.statusCount.draws;
        state.oneSeans.defeats = payload.statusCount.deafeats;
        state.oneSeans.status = payload.status;
    },
    setAutoChangeAC(state, {payload}:PayloadAction<boolean>){
      state.autoChange=payload;
    },
    setCreateFormDataAC(state, {payload}:PayloadAction){
      state.createFormData = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSeans.fulfilled, (state, { payload }) => {
        state.seansList = payload;
      })
      .addCase(createSeans.fulfilled, (state, { payload }) => {
        state.added = true;
      })
      .addCase(studentJoin.pending, (state, { payload }) => {
        state.studentJoinLoading = true;
      })
      .addCase(studentJoin.rejected, (state, { payload }) => {
        state.studentJoinLoading = false;
      })
      .addCase(studentJoin.fulfilled, (state, { payload }) => {
        state.studentJoinLoading = false;
        state.oneSeans = payload;
      })
      .addCase(leaveSeans.pending, (state, { payload }) => {
        state.studentJoinLoading = true;
      })
      .addCase(leaveSeans.rejected, (state, { payload }) => {
        state.studentJoinLoading = false;
      })
      .addCase(leaveSeans.fulfilled, (state, { payload }) => {
        state.studentJoinLoading = false;
        state.oneSeans = payload;
      })
      .addCase(acceptPlayerToSeans.pending, (state, { payload }) => {
        state.studentJoinLoading = true;
      })
      .addCase(acceptPlayerToSeans.rejected, (state, { payload }) => {
        state.studentJoinLoading = false;
      })
      .addCase(acceptPlayerToSeans.fulfilled, (state, { payload }) => {
        state.studentJoinLoading = false;
        state.oneSeans = payload;
      })
      .addCase(kickFromToSeans.pending, (state, { payload }) => {
        state.studentJoinLoading = true;
      })
      .addCase(kickFromToSeans.rejected, (state, { payload }) => {
        state.studentJoinLoading = false;
      })
      .addCase(kickFromToSeans.fulfilled, (state, { payload }) => {
        state.studentJoinLoading = false;
        state.oneSeans = payload;
      })
      .addCase(startSeans.pending, (state, { payload }) => {
        state.studentJoinLoading = true;
      })
      .addCase(startSeans.rejected, (state, { payload }) => {
        state.studentJoinLoading = false;
      })
      .addCase(startSeans.fulfilled, (state, { payload }) => {
        state.studentJoinLoading = false;
        state.oneSeans = payload;
      })
      .addCase(getOneSeans.pending, (state) => {
        state.oneSeansLoading = true;
        state.oneSeans = null;
      })
      .addCase(getOneSeans.fulfilled, (state, { payload }) => {
        state.oneSeansLoading = false;
        state.oneSeans = payload;
      })
      // .addCase(moveInSeans.pending, (state) => {
      //   // state.oneSeansLoading = true;
      //   // state.oneSeans = null;
      // })
      // .addCase(moveInSeans.fulfilled, (state, { payload }:PayloadAction<any>) => {
      //   // state.oneSeansLoading = false;
      //   state.oneSeans = payload;
      // })
      .addCase(seansUpdateGame.pending, (state) => {
        // state.oneSeansLoading = true;
        // state.oneSeans = null;
      })
      .addCase(seansUpdateGame.fulfilled, (state, { payload }:PayloadAction<any>) => {
        state.oneSeansLoading = false;
        state.oneSeans = payload;
      })
      .addCase(seansResults.pending, (state) => {
        state.loadingSessionsResults = true;
        state.sessionsResults = [];
      })
      .addCase(seansResults.fulfilled, (state, { payload }:PayloadAction<any>) => {
        state.loadingSessionsResults = false;
        state.sessionsResults = payload;
      });
  },
});

export default SeansSlice.reducer;
export const { setSeansList, pushSeansList, setOneSeans, setMoves, setBlackCaptures,setWhiteCaptures, setOneGame,setSeansUpdate, setOneGameTimer,setAutoChangeAC, setCreateFormDataAC } = SeansSlice.actions;
