import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ServerError } from '../../models/response/ServerError';
import InfoTextsService from '../../services/InfoTextsService';
import { IInfoText, EInfoTextFields, AdvicesForParentsData, AdvicesForTranersData } from '../../models/IInfoTexts';

export const getInfoText = createAsyncThunk<
  { text: IInfoText; field: EInfoTextFields },
  { field: EInfoTextFields }
>(
  'infoTextsSlice/getInfoText',
  async ({ field }, { rejectWithValue }) => {
    try {
      const response = await InfoTextsService.getInfoText(field);
      return { text: response.data.text, field };
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  }
);

export const editInfoText = createAsyncThunk<
  { text: IInfoText; field: EInfoTextFields },
  { text: IInfoText; field: EInfoTextFields }
>(
  'infoTextsSlice/editInfoText',
  async ({ text, field }, { rejectWithValue }) => {
    try {
      const response = await InfoTextsService.editInfoText({ text, field });
      return { text: response.data.text, field };
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  }
);

export const saveAdvicesForParents = createAsyncThunk<
  AdvicesForParentsData,
  AdvicesForParentsData & {videoFiles: {videoId: string, file: File}[], videosToDelete: string[]}
>(
  'infoTextsSlice/saveAdvicesForParents',
  async (data, { rejectWithValue }) => {
    try {
      const response = await InfoTextsService.saveAdvicesForParents(data);
      return response.data.text;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  }
);
export const saveAdvicesForTraners = createAsyncThunk<
  AdvicesForTranersData,
  AdvicesForTranersData & {videoFiles: {videoId: string, file: File}[], videosToDelete: string[] }
>(
  'infoTextsSlice/saveAdvicesForTraners',
  async (data, { rejectWithValue }) => {
    try {
      const response = await InfoTextsService.saveAdvicesForTraners(data);
      return response.data.text;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  }
);

export const getAdvicesForParents = createAsyncThunk<
  AdvicesForParentsData
>(
  'infoTextsSlice/getAdvicesForParents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await InfoTextsService.getAdvicesForParents();
      return response.data.text;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  }
);

export const getAdvicesForTraners = createAsyncThunk<
  AdvicesForTranersData
>(
  'infoTextsSlice/getAdvicesForTraners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await InfoTextsService.getAdvicesForTraners();
      return response.data.text;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  }
);

export const getHomeworkText = createAsyncThunk<
  string
>(
  'infoTextsSlice/getHomeworkText',
  async (_, { rejectWithValue }) => {
    try {
      const response = await InfoTextsService.getHomeworkText();
      return response.data.text;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  }
);

export const saveHomeworkText = createAsyncThunk<
  string,
  string
>(
  'infoTextsSlice/saveHomeworkText',
  async (data, { rejectWithValue }) => {
    try {
      const response = await InfoTextsService.saveHomeworkText(data);
      return response.data.text;
    } catch (error) {
      const err = error as AxiosError;
      const e = err.response?.data as ServerError;
      return rejectWithValue(e);
    }
  }
);

const initialState: {
  [EInfoTextFields.teamsGameInfo]: IInfoText;
  [EInfoTextFields.scheduleInfo]: IInfoText;
  [EInfoTextFields.advicesForParents]: AdvicesForParentsData;
  [EInfoTextFields.advicesForTraners]: AdvicesForTranersData;
  [EInfoTextFields.recomendationText]: IInfoText;
  [EInfoTextFields.homeworkText]: string;
  [EInfoTextFields.stockText]: IInfoText;
  [EInfoTextFields.waitForCoachText]: IInfoText;
  [EInfoTextFields.AutoSMSStartLesson30min]: IInfoText;
  [EInfoTextFields.AutoSMSStartLesson10min]: IInfoText;
  [EInfoTextFields.AutoSMSStartLesson120min]: IInfoText;
  [EInfoTextFields.willNotBePresent]: IInfoText;
  [EInfoTextFields.willBePresent]: IInfoText;
  [EInfoTextFields.studentAddedToGroup]: IInfoText;
  [EInfoTextFields.myNotificationsText]: IInfoText;
  [EInfoTextFields.estimateAutoSMS]: IInfoText;
  [EInfoTextFields.homeworkReminder]: IInfoText;
  [EInfoTextFields.homeworkDeadlineAdvice]: IInfoText;
  [EInfoTextFields.homeworkReminderFiveHours]: IInfoText;
} = {
  [EInfoTextFields.teamsGameInfo]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.scheduleInfo]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.advicesForParents]: {
    redTextAbove: {
      ru: '',
      en: '',
      am: '',
    },
    textBlocks: [],
  },
  [EInfoTextFields.advicesForTraners]: {
    redTextAbove: {
      ru: '',
      en: '',
      am: '',
    },
    textBlocks: [],
  },
  [EInfoTextFields.recomendationText]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.homeworkText]: '',
  [EInfoTextFields.stockText]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.waitForCoachText]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.AutoSMSStartLesson30min]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.AutoSMSStartLesson10min]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.AutoSMSStartLesson120min]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.willBePresent]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.willNotBePresent]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.studentAddedToGroup]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.myNotificationsText]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.estimateAutoSMS]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.homeworkReminder]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.homeworkDeadlineAdvice]: {
    ru: '',
    en: '',
    am: '',
  },
  [EInfoTextFields.homeworkReminderFiveHours]: {
    ru: '',
    en: '',
    am: '',
  },
};

const infoTextsSlice = createSlice({
  name: 'infoTextsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfoText.fulfilled, (state, action) => {
        if (
          action.payload.field === EInfoTextFields.teamsGameInfo
          || action.payload.field === EInfoTextFields.scheduleInfo
          || action.payload.field === EInfoTextFields.recomendationText
          || action.payload.field === EInfoTextFields.stockText
          || action.payload.field === EInfoTextFields.waitForCoachText
          || action.payload.field === EInfoTextFields.AutoSMSStartLesson30min
          || action.payload.field === EInfoTextFields.AutoSMSStartLesson10min
          || action.payload.field === EInfoTextFields.AutoSMSStartLesson120min
          || action.payload.field === EInfoTextFields.willBePresent
          || action.payload.field === EInfoTextFields.willNotBePresent
          || action.payload.field === EInfoTextFields.studentAddedToGroup
          || action.payload.field === EInfoTextFields.myNotificationsText
          || action.payload.field === EInfoTextFields.estimateAutoSMS
          || action.payload.field === EInfoTextFields.homeworkReminder
          || action.payload.field === EInfoTextFields.homeworkDeadlineAdvice
          || action.payload.field === EInfoTextFields.homeworkReminderFiveHours
        ) {
          state[action.payload.field] = action.payload.text;
        }
      })
      .addCase(editInfoText.fulfilled, (state, action) => {
        if (action.payload.field === EInfoTextFields.teamsGameInfo || action.payload.field === EInfoTextFields.scheduleInfo) {
          state[action.payload.field] = action.payload.text;
        }
      })
      .addCase(saveAdvicesForParents.fulfilled, (state, action) => {
        state[EInfoTextFields.advicesForParents] = action.payload;
      })
      .addCase(getAdvicesForParents.fulfilled, (state, action) => {
        state[EInfoTextFields.advicesForParents] = action.payload;
      })
      .addCase(saveAdvicesForTraners.fulfilled, (state, action) => {
        state[EInfoTextFields.advicesForTraners] = action.payload;
      })
      .addCase(getAdvicesForTraners.fulfilled, (state, action) => {
        state[EInfoTextFields.advicesForTraners] = action.payload;
      })
      .addCase(getHomeworkText.fulfilled, (state, action) => {
        state[EInfoTextFields.homeworkText] = action.payload;
      })
      .addCase(saveHomeworkText.fulfilled, (state, action) => {
        state[EInfoTextFields.homeworkText] = action.payload;
      });
  },
});

export default infoTextsSlice.reducer;