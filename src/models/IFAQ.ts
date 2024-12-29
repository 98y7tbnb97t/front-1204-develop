import { VideoItem } from "./IInfoTexts";

export interface IFAQ {
    _id: string;
    name: string;
    description: string;
    videos?: VideoItem[];
}