import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IMaterial, IMaterialResponse } from '../../models/Program/IMaterial';
import { ITheme } from '../../models/Program/ITheme';
import { IGroup } from '../../models/response/IGroup';
import { IgetThemes } from '../../models/response/ProgramResponses';
import { ServerError } from '../../models/response/ServerError';
import ProgramService from '../../services/ProgramService';

export interface ProgramState {
  themes: ITheme[];
  theme: string;
  materials: IMaterialResponse[];
  group: IGroup;
  allThemes: ITheme[];
}

const initialState: ProgramState = {
  themes: [] as ITheme[],
  theme: '',
  materials: [] as IMaterialResponse[],
  group: {} as IGroup,
  allThemes: [] as ITheme[],
};

export const getThemes = createAsyncThunk<
  ITheme[],
  { filter?: string; level?: number | null; id?: string }
>('programSlice/getThemes', async (data, { rejectWithValue }) => {
  try {
    const response = await ProgramService.getThemes(data);
    return response.data.themes.sort((a, b) => a.level - b.level);
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const getAllThemes = createAsyncThunk<ITheme[]>(
  'programSlice/getAllThemes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProgramService.getThemes({ filter: '', level: 0 });
      return response.data.themes.sort((a, b) => a.level - b.level);
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);
export const createTheme = createAsyncThunk<
  ITheme[],
  { name: string; filter: string; level: number; order: number }
>('programSlice/createTheme', async (data, { rejectWithValue }) => {
  try {
    const { name, filter, level, order } = data;
    const response = await ProgramService.createTheme(
      name,
      filter,
      level,
      order,
    );
    return response.data.themes;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const editTheme = createAsyncThunk<
  {
    themes: ITheme[]
    allThemes: ITheme[]
  },
  {
    themeId: string;
    line?: string;
    name?: string;
    seq?: { oldseq: number; seq: number };
    filter?: string;
    level?: number;
    order?: number;
  }
>('programSlice/editTheme', async (data, { rejectWithValue }) => {
  try {
    const { themeId, line, name, seq, filter, level, order } = data;

    const response = await ProgramService.editTheme(
      themeId,
      line,
      filter,
      name,
      order,
      seq,
      level,
    );
    return {themes: response.data.themes, allThemes: response.data.allThemes};
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const updateThemeOrders = createAsyncThunk<ITheme[], IgetThemes>(
  'programSlice/updateThemeOrders',
  async (themes, { rejectWithValue }) => {
    try {
      const response = await ProgramService.updateThemeOrders(themes);
      return response.data.themes;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data;
      return rejectWithValue(e);
    }
  },
);

export const deleteTheme = createAsyncThunk<ITheme, { themeId: string }>(
  'programSlice/deleteTheme',
  async (data, { rejectWithValue }) => {
    try {
      const { themeId } = data;
      const response = await ProgramService.deleteTheme(themeId);
      return response.data.theme;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const deleteMaterial = createAsyncThunk<
  IMaterialResponse[],
  { materialId: string }
>('programSlice/deleteMaterial', async (data, { rejectWithValue }) => {
  try {
    const { materialId } = data;
    const response = await ProgramService.deleteMaterial(materialId);
    return response.data.material;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const getMaterials = createAsyncThunk<IMaterialResponse[], string>(
  'programSlice/getMaterials',
  async (theme_id, { rejectWithValue }) => {
    try {
      const response = await ProgramService.getMaterials(theme_id);
      return response.data.materials;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  },
);

export const createMaterial = createAsyncThunk<
  IMaterialResponse[],
  { theme_id: string; pgn: string }
>('programSlice/createMaterial', async (data, { rejectWithValue }) => {
  try {
    const { theme_id, pgn } = data;
    const response = await ProgramService.createMaterial(theme_id, pgn);
    return response.data.material;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const createCustomMaterial = createAsyncThunk<
  IMaterialResponse[],
  {
    theme_id: string;
    fen: string;
    custom: [{ square: string; type: string }];
    theory?: string;
  }
>('programSlice/createCustomMaterial', async (data, { rejectWithValue }) => {
  try {
    const { theme_id, fen, custom, theory } = data;
    const response = await ProgramService.createCustomMaterial(
      theme_id,
      fen,
      custom,
      theory,
    );
    return response.data.material;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const editCustomMaterial = createAsyncThunk<
  IMaterialResponse[],
  {
    material_id: string;
    fen: string;
    custom: [{ square: string; type: string }];
    theory?: string;
  }
>('programSlice/editCustomMaterial', async (data, { rejectWithValue }) => {
  try {
    const { material_id, fen, custom, theory } = data;
    const response = await ProgramService.editCustomMaterial(
      material_id,
      fen,
      custom,
      theory,
    );
    return response.data.material;
  } catch (error) {
    const err = error as AxiosError;
    const e = err.response?.data as ServerError;
    return rejectWithValue(e);
  }
});

export const programSlice = createSlice({
  name: 'programSlice',
  initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.theme = payload as string;
    },
    setThemes(state, { payload }) {
      state.themes = payload as ITheme[];
    },
    setMaterials(state, { payload } : { payload: IMaterialResponse[] }) {
      state.materials = payload;
    },
    setSeq(state, action) {
      const payload = action.payload as { oldseq: number; seq: number };

      const index = state.themes.findIndex(
        (theme) => theme.seq === payload.oldseq,
      );

      if (payload.oldseq > payload.seq) {
        state.themes.map((theme) => {
          if (theme.seq >= payload.seq && theme.seq <= payload.oldseq) {
            theme.seq++;
          }
        });
      } else {
        state.themes.map((theme) => {
          if (theme.seq <= payload.seq && theme.seq >= payload.oldseq) {
            theme.seq--;
          }
        });
      }
      state.themes[index].seq = payload.seq;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getThemes.fulfilled, (state, { payload }) => {
        state.themes = payload;
      })
      .addCase(getAllThemes.fulfilled, (state, { payload }) => {
        state.allThemes = payload;
      })
      .addCase(createTheme.fulfilled, (state, { payload }) => {
        state.themes = payload;
      })
      .addCase(updateThemeOrders.fulfilled, (state, { payload }) => {
        state.themes = payload;
      })
      .addCase(getMaterials.fulfilled, (state, { payload }) => {
        state.materials = payload;
      })
      .addCase(createMaterial.fulfilled, (state, { payload }) => {
        payload.map((item) => {
          if (state.theme === item.theme_id) {
            state.materials.push(item);
          }
        });
      })
      .addCase(editCustomMaterial.fulfilled, (state, { payload }) => {
        const indx = state.materials.findIndex(
          (item) => item._id === payload[0]._id,
        );
        if (indx !== -1) {
          state.materials[indx] = payload[0];
        }
      })
      .addCase(deleteMaterial.fulfilled, (state, { payload }) => {
        state.materials = state.materials.filter(
          (item) => item._id !== payload[0]._id,
        );
      })
      .addCase(createCustomMaterial.fulfilled, (state, { payload }) => {
        payload.map((item) => {
          if (state.theme === item.theme_id) {
            state.materials.push(item);
          }
        });
      })
      .addCase(editTheme.fulfilled, (state, { payload }) => {
        state.themes = payload.themes;
        state.allThemes = payload.allThemes;
      })
      .addCase(deleteTheme.fulfilled, (state, { payload }) => {
        const newThemes = state.themes.filter(
          (theme) => theme._id !== payload._id,
        );
        state.allThemes = newThemes;
        state.themes = newThemes;
      });
  },
});

export default programSlice.reducer;
export const { setTheme, setThemes, setMaterials, setSeq } = programSlice.actions;
