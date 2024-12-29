import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ITestLesson, ITestLessonEdit } from '../../models/ITestLesson';
import { IGroupMessage } from '../../models/MyGroups/IGroupMessage';
import { IMove } from '../../models/MyGroups/IMove';
import { IGroup, IGroupEdit } from '../../models/response/IGroup';
import { ServerError } from '../../models/response/ServerError';
import GroupService from '../../services/GroupService';
import TestLessonService from '../../services/TestLessonService';
import { WritableDraft } from 'immer/dist/internal.js';

export interface GroupState {
  groups: IGroup[];
  groupsContainer: IGroup[];
  group: IGroup;
  chat: IGroupMessage[];
  game: IMove[];
}

const initialState: GroupState = {
  groups: [],
  groupsContainer: [],
  group: {} as IGroup,
  chat: [],
  game: [],
};

export const getGroups = createAsyncThunk<
    IGroup[],
    { archive?: boolean; noStudents?: boolean; videocounter?: boolean, search?: string; }
>('groupSlice/getGroups', async (data, { rejectWithValue }) => {
  try {
    const { archive, videocounter, noStudents, search } = data;
    const response = await GroupService.getGroups(
        archive,
        search,
        videocounter,
        noStudents,
    );
    return response.data.groups;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const getGroup = createAsyncThunk<IGroup, string>(
    'groupSlice/getGroup',
    async (groupId, { rejectWithValue }) => {
      try {
        const response = await GroupService.getGroup(groupId);
        return response.data.group;
      } catch (error) {
        const err = error as AxiosError;
        const e = err.response?.data as ServerError;
        return rejectWithValue(e);
      }
    },
);

export const getTestGroup = createAsyncThunk<ITestLesson, string>(
    'groupSlice/getTestGroup',
    async (groupId, { rejectWithValue }) => {
      try {
        const response = await TestLessonService.getGroup(groupId);
        return response.data.group;
      } catch (error) {
        const err = error as AxiosError;
        const e = err.response?.data as ServerError;
        return rejectWithValue(e);
      }
    },
);

export const addUserToGroup = createAsyncThunk<
    IGroup,
    { email: string; group_id: string }
>('groupSlice/addUserToGroup', async (data, { rejectWithValue }) => {
  try {
    const { email, group_id } = data;
    const response = await GroupService.addUserToGroup(email, group_id);
    return response.data.group;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const removeUserFromGroup = createAsyncThunk<{group: IGroup, userWithoutGroups: boolean}, {email: string, group_id: string}>(
  'groupSlice/removeUserFromGroup',
  async (data, {rejectWithValue}) => {
      try {
          const { email, group_id } = data;
          const response = await GroupService.removeUserFromGroup(email, group_id);
          return { group: response.data.group, userWithoutGroups: response.data.userWithoutGroups };
      } catch ( error ) {
        console.log(error)
          const err = error as AxiosError;
          const e = err.response?.data as ServerError
          return rejectWithValue(e);
      }
  }
)

export const createGroup = createAsyncThunk<
    IGroup,
    {
      name: string;
      traners: Array<string>;
      level: string;
      starts: string;
      country: string;
      dates: { days: number[]; time: string }[];
    }
>('groupSlice/createGroup', async (data, { rejectWithValue }) => {
  try {
    const { name, traners, level, starts, dates,country } = data;
    const response = await GroupService.createGroup(
        name,
        traners,
        level,
        starts,
        country,
        dates
    );
    return response.data.group;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const deleteGroup = createAsyncThunk<IGroup, { groupId: string }>(
    'groupSlice/deleteGroup',
    async (data, { rejectWithValue }) => {
      try {
        const { groupId } = data;
        const response = await GroupService.deleteGroup(groupId);
        return response.data.group;
      } catch (error) {
        const err = error as AxiosError;
        const e = err.response?.data as ServerError;
        return rejectWithValue(e);
      }
    },
);

export const editGroup = createAsyncThunk<
    IGroup,
    { groupId: string; payload: IGroupEdit }
>('groupSlice/editGroup', async (data, { rejectWithValue }) => {
  try {
    const { groupId, payload } = data;
    const response = await GroupService.editGroup(groupId, payload);
    if (payload.open !== undefined) {
      response.data.group.open = payload.open;
    }
    return response.data.group;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const editTestGroup = createAsyncThunk<
    ITestLesson,
    { groupId: string; payload: ITestLessonEdit }
>('groupSlice/editTestGroup', async (data, { rejectWithValue }) => {
  try {
    const { groupId, payload } = data;
    const response = await TestLessonService.editGroup(groupId, payload);
    return response.data.group;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const groupSlice = createSlice({
  name: 'groupSlice',
  initialState,
  reducers: {
    searchGroups(state, action) {
      const s = action.payload as string;
      const regex = new RegExp(`${s.toLowerCase()}.*`);
      state.groups = state.groupsContainer.filter((group) =>
          group.name.toLowerCase().match(regex),
      );
    },
    sendMessage(state, action) {
      const msg = action.payload as IGroupMessage;
      state.chat.push(msg);
    },
    setGameState(state, action) {
      const material = action.payload as string;
      if (state.group?.history.length > 0) {
        try {
          const cond = state.group.history.find(
              (item) => item.material === material,
          )?.moves;
          if (cond.length > 0) {
            cond.map((item) => {
              const cond2 = state.game.findIndex(
                  (itemG) => itemG.user_id === item.user_id,
              );
              if (cond2 !== -1) {
                state.game[cond2] = item;
                //state.game[cond2].deleted = [];
              } else {
                state.game.push(item);
              }
            });
          } else {
            state.game.map((item) => {
              item.moves = [];
              item.deleted = [];
            });
          }
        } catch (error) {
          //state.game = [];
          if (state.game) {
            state.game.map((item) => {
              item.moves = [];
              item.deleted = [];
            });
          }
        }
      }
    },
    clearGameState(state) {
      state.game.map((game) => {
        game.moves = [];
      });
    },
    initOnlineLesson(state) {
      state.game = [];
      state.chat = [];
    },
    clearUserMoves(state, action) {
      const user_id = action.payload as string;
      const indx = state.game.findIndex((item) => item.user_id === user_id);
      if (state.game[indx].moves.length > 0) {
        if (!state.game[indx].deleted) {
          state.game[indx].deleted = [];
        }
        state.game[indx].deleted.push(state.game[indx].moves);
        state.game[indx].moves = [];
      }
    },
    editUserName(state, action) {
      const { user_id, name } = action.payload as {
        user_id: string;
        name: string;
      };

      const indx = state.game.findIndex((item) => item.user_id === user_id);
      state.game[indx].name = name;
    },
    setMovesState(state, action) {
      const move = action.payload as {
        user_id: string;
        color: string;
        move: string;
      };
      const indx = state.game.findIndex(
          (user) => user.user_id === move.user_id,
      );
      if (indx !== -1) {
        state.game[indx].moves.push({ color: move.color, move: move.move });
      }
    },
    pushGame(state, action) {
      const move = action.payload as IMove;
      const indx = state.game.findIndex(
          (user) => user.user_id === move.user_id,
      );
      if (indx === -1) {
        state.game.push(move);
      }
    },
    stepBack(state, action) {
      const move = action.payload as IMove;
      const indx = state.game.findIndex(
          (user) => user.user_id === move.user_id,
      );
      if (indx !== -1) {
        state.game[indx].moves.pop();
      }
    },
    endLessonReducer(state) {
      if (state.group.program) {
        state.group.prevprogram = state.group.program;
      }
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getGroups.fulfilled, (state, { payload }) => {
          state.groups = [];
          let curDay = new Date().getDay();
          const temp: WritableDraft<IGroup>[] = [];
          payload.map((item) => {
            const idates: number[] = [];
            item?.dates?.map((idate) => {
              idates.push(...idate.days);
            });
            let iday = 0;

            if (curDay === 0) {
              curDay = 7;
            }

            if (idates.includes(curDay)) {
              iday = curDay;
            } else {
              const maxDay = Math.max(...idates);

              if (curDay > maxDay) {
                iday = idates.filter((day) => day < curDay)[0];
              } else {
                iday = idates.filter((day) => day > curDay)[0];
              }
            }

            const time = item.dates?.find((date) =>
                date.days.includes(iday),
            )?.time;

            temp.push({ ...item, date: iday, time: time });
          });
          state.groups = temp.sort((x, y) => Number(y.date) - Number(x.date));
          state.groupsContainer = temp.sort((x, y) => Number(y.date) - Number(x.date));
        })
        .addCase(getGroups.rejected, (state) => {
          state.groups = []
        })
        .addCase(getGroup.fulfilled, (state, { payload }) => {
          state.group = payload;
        })
        .addCase(getTestGroup.fulfilled, (state, { payload }) => {
          state.group = payload;
        })
        .addCase(createGroup.fulfilled, (state, { payload }) => {
          state.groups.unshift(payload);
        })
        .addCase(deleteGroup.fulfilled, (state, { payload }) => {
          state.groups = state.groups.filter(
              (group) => group._id !== payload._id,
          );
        })
        .addCase(editGroup.fulfilled, (state, { payload }) => {
          if (payload.archive) {
            state.groups = state.groups.filter(
                (group) => group._id !== payload._id,
            );
          }
          state.group.name = payload.name;
          state.group.history = payload.history;
          state.group.open = payload.open;
        })
        .addCase(editTestGroup.fulfilled, (state, { payload }) => {
          state.group.history = payload.history;
        })

        .addCase(addUserToGroup.fulfilled, (state, { payload }) => {
          state.group.users = payload.users;
        })
        .addCase(removeUserFromGroup.fulfilled, (state, { payload }) => {
          state.group = {
              ...state.group,
              users: state.group?.users && payload.group?.users
                  ? state.group?.users.filter(item => payload.group && (payload.group.users.map(item => item._id)).includes(item._id))
                  : []
          };
      });
  },
});

export default groupSlice.reducer;
export const {
  sendMessage,
  pushGame,
  setGameState,
  setMovesState,
  clearGameState,
  clearUserMoves,
  stepBack,
  searchGroups,
  editUserName,
  endLessonReducer,
  initOnlineLesson,
} = groupSlice.actions;