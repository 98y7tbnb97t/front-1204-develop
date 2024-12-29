import {Elanguages} from "../../store/reducers/TranslateSlice.ts";
import {UserRoles} from "../../utils/userRoles.ts";

export interface EditUserReQData {
    email?: string,
    name?: string,
    sname?: string,
    tname?: string,
    role?: UserRoles,
    password?: string,
    born?: Date,
    country?: string,
    city?: string,
    sex?: string,
    shedule?: {
        time: string,
        days: string[]
    }[],
    avatar?: string,
    format?: string,
    durency?: string,
    languages?: Elanguages[],
    nationality?: string;
    comment?: string
    requizits?: number
}
