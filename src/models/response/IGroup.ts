import { ISelect } from '../ISelect';
import { ISubject } from '../ISubject';
import { IMaterial } from '../Program/IMaterial';
import { ITheme } from '../Program/ITheme';
import { User } from '../User';

export interface IGroup {
  moveMode: boolean;
  _id: string;
  dialog_id: string;
  name: string;
  description: string;
  users: User[];
  level: string;
  current?: string;
  start: string;
  country?: string;
  open: boolean;
  program: IMaterial[];
  deletedProgram: IMaterial[];
  prevprogram: IMaterial[];
  substituteTranerComment?: string;
  substituteTranerCommentBy?: User;
  substituteTranerCommentAt?: Date;
  history: Array<{
    material?: string;
    moves: {
      _id?: string;
      user_id: string;
      name: string;
      sname: string;
      moves: Array<{ color: string; move: string }>;
      movesHistory?: string[];
    }[];
  }>;
  archive: boolean;
  lasthomework: string;
  format?: string;
  status?: string;
  date?: number;
  time?: string;
  dates?: [
    {
      days: [number];
      time: string;
      current: string;
      endtime: string;
    },
  ];
  videocounter?: number;
  createdAt?: string;
  createdBy?: User;
  archivedAt?: string;
  archivedBy?: User;
  inLessonOnline?: Array<{
    _id: string;
    role: string;
  }>;
  passed?: Array<{
    theme: string;
    materials: Array<{
      material: string;
      passedAt: Date;
    }>;
  }>;
  passedHistory?: Array<IPassedHistory>;
  homeworkHistory?: Array<IHomeworkHistory>;
  timer?: ITimer[];
  subject?: ISubject;
}

export interface IPassedHistory {
  theme: string;
  history: Array<{
    date: Date,
    passedCount: number
  }>
}

export interface IHomeworkHistory {
  theme: string;
  history: Array<{
    date: Date,
    materials: string[]
  }>
}

export interface ITimer {
  theme: ITheme;
  materials: Array<{
    material: IMaterial;
    time: string;
  }>;
}

export interface IDate {
  days?: number[];
  time: string;
  current?: string;
  starttime: string;
  endtime: string;
  graphic?: ISelect[];
}

export interface IGroupEdit {
  name?: string;
  description?: string;
  traners?: string[];
  level?: string;
  start?: string;
  open?: boolean;
  end?: Date;
  program?: string[];
  prevprogram?: string[];
  material?: string;
  current?: string;
  substituteTranerComment?: string;
  deletedProgram?: string[];
  country?: string;
  users?: Array<{ _id: string; role: string }>;
  format?: string;
  status?: string;
  move?: {
    id?: string;
    user_id: string;
    name: string;
    sname: string;
    moves: Array<{ color: string; move: string }>;
  };
  deleted?: { user_id: string; moves: Array<{ color: string; move: string }> };
  movesHistory?: string[];
  moveMode?: boolean;
  archive?: boolean;
  dates?: IDate[];
  userIdInLesson?: string;
  subject?: string;
  lastLessonStart?: Date;
  lastLessonEnd?: Date;
}

export interface IUpdatePassedMaterials {
  groupId: string;
  payload: {
    themeId: string | string[];
    materialId?: string | string[];
    type: 'add' | 'restore';
    addToHistory: boolean;
    section?: 'homework' | 'program';
  };
}

export type ProgramActionType = 'add' | 'restore' | 'putoff' | 'removepostponed'

export interface IProgramActionsHistory {
  _id: string,
  group_id: string;
  actions: Array<{
      _id?: string;
      date: Date,
      type: ProgramActionType,
      themes: ITheme[] | string[],
      materials: IMaterial[] | string[],
      section?: 'homework' | 'program'
  }>
}