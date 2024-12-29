import { UserRoles } from '../utils/userRoles.ts';
import { ECountries } from './ECountries.ts';
import { EUserLanguages } from './EUserLanguages.ts';
import { IDialogType } from './IDialogType';

export type EditRequestValue = string | string[] | UserSchedule[];

export interface EditRequest {
  field: string;
  acceptedAt: Date | null;
  rejectedAt: Date | null;
  value: EditRequestValue;
}

export const enum EWeekDays {
  PN = 'pn',
  VT = 'vt',
  SR = 'sr',
  CT = 'ct',
  PT = 'pt',
  SB = 'sb',
  VS = 'vs',
}

export interface UserSchedule {
  time: string;
  days: EWeekDays[];
}

export enum ELessonFormatTypes {
  GROUP = 'group',
  IND = 'ind',
  GROUPIND = 'groupind',
}

export type ActionType = 'close' | 'open' | 'closeTrust' | 'trustLesson';

export interface IBlockHistory {
  blockedBy?: User;
  blockedAt: Date;
  type: ActionType;
}

export interface IScheduleEditHistory {
  acceptedAt: string;
  schedule: UserSchedule[];
}

export interface User {
  _id: string;
  email: string;
  name: string;
  sname: string;
  tname: string;
  avatar?: string;
  role: UserRoles;
  online?: boolean;
  lastOnline?: Date;
  dialog_types?: IDialogType[];
  lichess?: string;
  requizits?: number;
  born?: Date;
  country?: ECountries;
  sex?: string;
  archive?: boolean;
  access?: boolean;
  trustLesson?: boolean;
  trustLessonForbidden?: boolean;
  trustLessonDates?: Date[];
  blockHistory?: IBlockHistory[];
  commentToDebtor?: string;
  seance?: boolean;
  offline?: boolean;
  groups?: [{ _id: string; name: string, users?: User[], level?: string }];
  shedule?: UserSchedule[];
  scheduleEditHistory: IScheduleEditHistory[];
  format?: ELessonFormatTypes;
  durency?: string;
  comment?: string;
  parentName?: string;
  actualMail?: string;
  nationality?: string;
  languages?: EUserLanguages[];
  city?: string;
  whatsappNumber?: string;
  editRequest?: EditRequest[];
  fcm?: string;
  open_level?: number[];
  isOnline: boolean;
  removedFromGroupBy?: { name: string };
  timeZone?: string;
  browserTimeZone?: string;
  test_user_id?: string;
  lastTimeInLesson?: Date;
}

export interface Session {
  _id?: string;
  users: {
    _id: string;
    name: string;
    sname?: string;
    email: string;
  }[];
}
