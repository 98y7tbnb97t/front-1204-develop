import { IMessage } from "./IMessage";
import {IRequisite} from "./IRequisite.ts";
import { User } from "./User.ts";

export enum MuteDurations {
    EightHours = "EightHours",
    OneWeek = "OneWeek",
    ThirtyDays = "ThirtyDays",
    NinetyDays = "NinetyDays",
    Forever = "Forever"
}

export interface MutedUserItem {
    user_id: string;
    until: Date;
}

export interface IChat {
    _id: string;
    name: string;
    sname: string;
    avatar: string;
    tagId?: string;
    unreaded: number;
    lastmsg: IMessage;
    isOnline: boolean;
    isTech: boolean;
    group_id?: string;
    archive?: boolean;
    showNames?: boolean;
    users?: User[];
    anonim?: boolean;
    country?: string | null;
    requisite?: IRequisite | null;
    mutedUsers: MutedUserItem[]
}