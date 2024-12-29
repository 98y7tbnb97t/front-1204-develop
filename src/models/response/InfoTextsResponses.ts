import { AdvicesForParentsData, AdvicesForTranersData, IInfoText } from "../IInfoTexts";

export interface IGetInfoText {
    text: IInfoText;
}

export interface IEditInfoText {
    text: IInfoText;
    field: string;
}

export interface IResponseAdvicesForParents {
    text: AdvicesForParentsData;
}

export interface IResponseAdvicesForTraners {
    text: AdvicesForTranersData;
}

export interface IResponseHomeworkText {
    text: string;
}