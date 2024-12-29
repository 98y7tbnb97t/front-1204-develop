import { Elanguages } from "../store/reducers/TranslateSlice";
import { IAttachment } from "./IAttachment";

interface IMessageFrom {
    _id: string;
    name: string;
    sname: string;
    email: string;
    avatar: string;
    hex: string;
    role: string;
    isOnline: boolean;
}

export interface IReaction {
    from: string[];
    emoji: string;
}

export interface IMessage {
    _id: string;
    msg: string;
    msgTranslations?: { [key in Elanguages]: string },
    time: Date;
    to?: string;
    from?: IMessageFrom;
    readed?: string[];
    type: string;
    audio?: string;
    attachments: IAttachment[];
    reply?: IMessage;
    homework?: string;
    color?: string;
    attemps?: [Date];
    reactions?: IReaction[];
    isAutoSMS?: boolean;
    additionalContent?: string;
    usersToSend?: string[];
}

export interface IMessageUpdate extends Omit<IMessage, 'to'> {
    to?: {
        users: string[];
        _id: string;
    };
}