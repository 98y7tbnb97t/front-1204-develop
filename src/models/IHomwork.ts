import { IMaterial } from "./Program/IMaterial";
import { IGroup } from "./response/IGroup";

export interface IHomework {
    name: string;
    _id: string,
    group_id: IGroup,
    end: Date,
    lesson?: Date,
    completed?: Array<string>,
    autocheck?: boolean,
    results?: [{
        user_id: string,
        results: [
            {
                material: string,
                result: string
            }
        ]
    }],

    program: IMaterial[],
    history: Array<{ material?: string, moves:[{_id?: string; user_id: string, name: string; sname: string; movesHistory?: string[], moves: Array<{color: string, move: string}>}]}>
    tranersComment?: string;
}

export interface IHomeworkEdit {
    move?: { id?: string; user_id: string, name: string; sname: string; moves: Array<{color: string, move: string}>;};
    movesHistory?: string[],
    material?: string,
    program?: string[],
    autocheck?: string,
}