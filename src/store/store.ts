import { combineReducers, configureStore } from '@reduxjs/toolkit';
import BalanceSlice from './reducers/BalansSlice.ts';
import FaqSlice from './reducers/FAQSlice';
import GroupSlice from './reducers/GroupSlice';
import HomeworkSlice from './reducers/HomeworkSlice';
import MessengerSlice from './reducers/MessengerSlice';
import PermissionsSlice from './reducers/PermissionsSlice.ts';
import ProgramSlice from './reducers/ProgramSlice';
import SeansSlice from './reducers/SeansSlice.ts';
import SessionSlice from './reducers/SessionSlice.ts';
import TranslateSlice from './reducers/TranslateSlice.ts';
import UserSlice from './reducers/UserSlice';
import InfoTextsSlice from './reducers/InfoTextsSlice';
import AutoSMSSlice from './reducers/AutoSMSSlice.ts';
import EstimatesSlice from './reducers/EstimatesSlice.ts';

const rootReducer = combineReducers({
  UserSlice,
  MessengerSlice,
  GroupSlice,
  ProgramSlice,
  HomeworkSlice,
  FaqSlice,
  TranslateSlice,
  PermissionsSlice,
  BalanceSlice,
  SeansSlice,
  SessionSlice,
  InfoTextsSlice,
  AutoSMSSlice,
  EstimatesSlice
});

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
