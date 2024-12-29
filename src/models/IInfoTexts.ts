import { Elanguages } from "../store/reducers/TranslateSlice";

export interface IInfoText {
    [Elanguages.RU]: string | undefined;
    [Elanguages.EN]: string | undefined;
    [Elanguages.AM]: string | undefined;
}

export enum EInfoTextFields {
  teamsGameInfo = 'teamsGameInfo',
  scheduleInfo = 'scheduleInfo',
  advicesForParents = 'advicesForParents',
  advicesForTraners = 'advicesForTraners',
  recomendationText = 'recomendationText',
  homeworkText = 'homeworkText',
  stockText = 'stockText',
  waitForCoachText = 'waitForCoachText',
  AutoSMSStartLesson30min = 'AutoSMSStartLesson30min',
  AutoSMSStartLesson10min = 'AutoSMSStartLesson10min',
  AutoSMSStartLesson120min = 'AutoSMSStartLesson120min',
  willBePresent = 'willBePresent',
  willNotBePresent = 'willNotBePresent',
  studentAddedToGroup = 'studentAddedToGroupText',
  myNotificationsText = 'myNotificationsText',
  estimateAutoSMS = 'estimateAutoSMS',
  homeworkReminder = 'homeworkReminder',
  homeworkDeadlineAdvice = 'homeworkDeadlineAdvice',
  homeworkReminderFiveHours = 'homeworkReminderFiveHours',
}

export interface VideoItem {
  id: string;
  title: { [key in Elanguages]: string };
  url: string;
}

export interface TextBlock {
  id: string;
  _id?: string;
  title: { [key in Elanguages]: string };
  content: { [key in Elanguages]: string };
  videos: VideoItem[];
  language: Elanguages;
}

export interface AdvicesForParentsData {
  redTextAbove: { [key in Elanguages]: string };
  textBlocks: TextBlock[];
}

export interface AdvicesForTranersData {
  redTextAbove: { [key in Elanguages]: string };
  textBlocks: TextBlock[];
}