import {ISelect} from "../models/ISelect.ts";
import {Elanguages} from "../store/reducers/TranslateSlice.ts";
import { SelectOptions } from "../constants.ts";

export const createSelectOptionsFromObj = <T>(obj: SelectOptions<T>, language: Elanguages) => {
    return Object.values(obj).map((item, index) => ({
        id: index.toString(),
        name: item.text[language],
        slug: item.slug
    })) as ISelect[]
}