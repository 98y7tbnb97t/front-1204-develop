import { AxiosResponse } from 'axios';
import $api, { apiService } from '../http';
import { User } from '../models/User';
import {
  IacceptEdits,
  IgetUsers,
  IgetUsersCounter,
} from '../models/response/PermissionsResponses';

const enum EPayloads {
  ROLE = 'role',
  NAME = 'name',
  SNAME = 'sname',
  REQUIZITS = 'requizits',
  ARCHIVE = 'archive',
  ALL_GROUPS = 'allgroups',
  TNAME = 'tname',

  techTrainer = 'techTrainer',
  techStudents = 'techStudents',
  programmers = 'programmers',
  adminProblems = 'adminProblems',
  admins = 'admins',
  trainerProblems = 'trainerProblems',
  trainingProgram = 'trainingProgram',
  araratInt = 'araratInt',
  urgent = 'urgent',
  report = 'report',
  testForNewTrainers = 'testForNewTrainers',
  groupForNewTrainers = 'groupForNewTrainers',
  importantNews = 'importantNews',
  chatForChecks = 'chatForChecks',
  armTrainers = 'armTrainers',
  rusTrainers = 'rusTrainers',
  engTrainers = 'engTrainers',
  fraTrainers = 'fraTrainers',
  gerTrainers = 'gerTrainers',
  seance = 'seance',
  online = 'online',
  offline = 'offline',
  notifications = 'notifications',
  testLessonQuestions = 'testLessonQuestions',
  psycho = 'psycho',
  open_level = 'open_level',
  access = 'access',
  commentToDebtor = 'commentToDebtor',
  trustLesson = 'trustLesson',
  trustLessonForbidden = 'trustLessonForbidden',
}

export interface IPayload {
  [EPayloads.ROLE]?: string;
  [EPayloads.NAME]?: string;
  [EPayloads.SNAME]?: string;
  [EPayloads.REQUIZITS]?: number;
  [EPayloads.ARCHIVE]?: boolean;
  [EPayloads.ALL_GROUPS]?: boolean;
  [EPayloads.TNAME]?: string;
  [EPayloads.open_level]?: string;
  [EPayloads.access]?: boolean;
  [EPayloads.commentToDebtor]?: string;
  [EPayloads.trustLesson]?: boolean | null;
  [EPayloads.trustLessonForbidden]?: boolean;

  // ----
  [EPayloads.techTrainer]: boolean;
  [EPayloads.techStudents]: boolean;
  [EPayloads.programmers]: boolean;
  [EPayloads.adminProblems]: boolean;
  [EPayloads.admins]: boolean;
  [EPayloads.trainerProblems]: boolean;
  [EPayloads.trainingProgram]: boolean;
  [EPayloads.araratInt]: boolean;
  [EPayloads.testForNewTrainers]: boolean;
  [EPayloads.groupForNewTrainers]: boolean;
  [EPayloads.importantNews]: boolean;
  [EPayloads.chatForChecks]: boolean;
  [EPayloads.armTrainers]: boolean;
  [EPayloads.rusTrainers]: boolean;
  [EPayloads.engTrainers]: boolean;
  [EPayloads.fraTrainers]: boolean;
  [EPayloads.gerTrainers]: boolean;
  [EPayloads.seance]: boolean;
  [EPayloads.online]: boolean;
  [EPayloads.offline]: boolean;
  [EPayloads.notifications]: boolean;
  [EPayloads.testLessonQuestions]: boolean;
  [EPayloads.psycho]: boolean;
  [EPayloads.urgent]: boolean;
  [EPayloads.report]: boolean;
}

const fields = [
  EPayloads.ROLE,
  EPayloads.NAME,
  EPayloads.SNAME,
  EPayloads.REQUIZITS,
  EPayloads.ARCHIVE,
  EPayloads.ALL_GROUPS,
  EPayloads.TNAME,
  EPayloads.open_level,
  // ----
  EPayloads.techTrainer,
  EPayloads.techStudents,
  EPayloads.programmers,
  EPayloads.adminProblems,
  EPayloads.admins,
  EPayloads.commentToDebtor,
  EPayloads.trainerProblems,
  EPayloads.trainingProgram,
  EPayloads.araratInt,
  EPayloads.testForNewTrainers,
  EPayloads.groupForNewTrainers,
  EPayloads.importantNews,
  EPayloads.chatForChecks,
  EPayloads.armTrainers,
  EPayloads.rusTrainers,
  EPayloads.engTrainers,
  EPayloads.fraTrainers,
  EPayloads.gerTrainers,
  EPayloads.seance,
  EPayloads.online,
  EPayloads.offline,
  EPayloads.notifications,
  EPayloads.psycho,
  EPayloads.urgent,
  EPayloads.report,
  EPayloads.testLessonQuestions,
  EPayloads.access,
  EPayloads.trustLesson,
  EPayloads.trustLessonForbidden,
];

export default class PermissionsService {
  static async getUsers(
    role?: string,
    search?: string,
    open_level?: string,
    archive?: boolean,
    sort?: string,
    withoutgroups?: boolean,
    all?: boolean,
    access?: boolean,
    trustLesson?: boolean,
    testUser?: boolean,
  ): Promise<AxiosResponse<IgetUsers>> {
    const payload = {} as {
      role?: string;
      open_level?: string;
      search?: string;
      archive?: boolean;
      sort?: string;
      withoutgroups?: boolean;
      all?: boolean;
      access?: boolean;
      trustLesson?: boolean;
      testUser?: boolean;
    };

    if (role) {
      payload.role = role;
    }
    if (open_level) {
      payload.open_level = open_level;
    }
    if (search) {
      payload.search = search;
    }
    if (sort) {
      payload.sort = sort;
    }
    if (archive === true) {
      payload.archive = true;
    } else if (archive === false) {
      payload.archive = false;
    }
    if (withoutgroups === true) {
      payload.withoutgroups = true;
    } else if (withoutgroups === false) {
      payload.withoutgroups = false;
    } else if (all) {
      payload.all = true;
    }
    if (access !== undefined) {
      payload.access = access;
    }
    if (trustLesson !== undefined) {
      payload.trustLesson = trustLesson;
    }
    if (testUser !== undefined) {
      payload.testUser = testUser;
    }
    return $api.get<IgetUsers>(`/${apiService}/users`, { params: payload });
  }
  static async getUser(userid: string): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/${apiService}/users/` + userid);
  }
  static async users(): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/${apiService}/users/`);
  }
  static async setRole(
    _id: string,
    data: IPayload,
  ): Promise<AxiosResponse<IgetUsers>> {
    const payload = {} as IPayload;

    fields.forEach((item) => {
      if (data[item] !== undefined) {
        (
          payload as Record<
            typeof item,
            string | number | boolean | null | undefined
          >
        )[item] = data[item];
      }
    });

    return $api.post<IgetUsers>(
      `/${apiService}/role`,
      { _id, ...payload },
      { withCredentials: true },
    );
  }
  static async getCounter(): Promise<AxiosResponse<IgetUsersCounter>> {
    return $api.get<IgetUsersCounter>(`/${apiService}/userscounter`);
  }

  static async acceptEdit(
    userid: string,
    fields: { [key in string]: boolean },
  ): Promise<AxiosResponse<IacceptEdits>> {
    const reqData = Object.keys(fields).map((key) => ({
      field: key,
      acceptedAt: fields[key] ? new Date() : null,
      rejectedAt: !fields[key] ? new Date() : null,
    }));
    return $api.put<IacceptEdits>(
      `/service2/accept/${userid}`,
      { data: reqData },
      { withCredentials: true },
    );
  }
}
