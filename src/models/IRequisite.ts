import { ECountries } from "./ECountries.ts";
import {IChat} from "./IChat.ts";

export interface DisclosureData {
    id: string,
    title: {
        ru: string,
        am: string,
        en: string
    };
    body: {
        ru: string,
        am: string,
        en: string
    };
}

export interface IRequisite {
    _id: string,
    bic: string,
    accountNumber: string,
    card: string,
    cardType: string,
    countries: ECountries[],
    ownerEn: string,
    ownerRu: string,
    requisiteID: number,
    expireDate: string,
    dialogs: IChat[],
    users: number,
    usersTotal: number,
    linkTitle: {
        ru: string;
        am: string;
        en: string;
    },
    link: string,
    transferByCardText: {
        ru: string;
        am: string;
        en: string;
    },
    disclosuresData: DisclosureData[]
    usersArchived: number
}
