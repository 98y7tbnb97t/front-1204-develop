import { Elanguages } from "../store/reducers/TranslateSlice";
import { ITranslateItemString } from "../utils/translations";
import { UserRoles } from "../utils/userRoles";

export interface IAutoSMS {
    _id: string,
    dialog_id?: string,
    group_id?: string,
    homework_id?: string,
    date?: string,
    repeat?: RepeatOptions,
    notifications: INotification[],
    text: {
        [Elanguages.RU]: string,
        [Elanguages.EN]: string,
        [Elanguages.AM]: string,
    },
    sendToNotifications: boolean,
    usersToSend?: string[],
    title: string,
    enabled: boolean,
    additionalContent?: string;
    isPersonal: boolean;
    isAdditional?: boolean;
    archived?: boolean | null;
    nationalities?: string[] | null;
    roles?: UserRoles[] | null;
    format?: string | null;
    period?: string | null;
    status?: string | null;
    language?: string | null;
    subject?: string | null;
    type?: string | null;
    autoSMSType?: string | null;
}

export interface IAutoSMSType {
    _id: string;
    name: ITranslateItemString;
    slug: string;
}

export interface IAutoSMSTemplate {
    _id: string;
    name: ITranslateItemString;
    template: ITranslateItemString;
    slug: string;
}

export enum RepeatOptions {
    None = "None",
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
    Yearly = "Yearly",
  }

export interface INotification {
    amount: number;
    unit: string;
}

export enum Units {
    MINUTES = 'MINUTES',
    HOURS = 'HOURS',
    DAYS = 'DAYS',
    WEEKS = 'WEEKS',
}
  