import { User } from "./User";

export interface Estimate {
    estimate: number;
    icon: string;
}

export enum EstimateCommentVisibilityOptions {
    administration = 'administration',
    traner = 'traner',
    parents = 'parents'
}

export interface IEstimate {
    _id: string;
    group: string;
    lessonDate: Date;
    lessonDuration: number;
    traner: User;
    reviews: IEstimateReview[];
}

export interface IEstimateReview {
    _id?: string;
    estimate: number;
    icon: string;
    from: User;
    comment?: string;
    administrationComment?: string;
    tranerCanSee: boolean;
    parentsCanSee: boolean;
    admCommentTranerCanSee?: boolean;
    admCommentParentsCanSee?: boolean;
    admCommentOtherCanSee?: boolean;
    admCommentFrom?: User;
    admCommentDate?: Date;
    date: Date;
}