import { IGroup, IProgramActionsHistory } from "./IGroup";
import { ILog } from "./ILog";
import { IRec, IInd } from "./IRec";

export interface IgetGroups {
    groups: Array<IGroup>;
}
export interface IgetGroup {
    group: IGroup;
}

export interface IUpdatePassedMaterialsResponse {
    group: IGroup;
    programActionsHistory: IProgramActionsHistory;
}

export interface IRemoveUserFromGroup {
    group: IGroup;
    userWithoutGroups: boolean;
}

export interface IgetLogs {
    logs: Array<ILog>;
}

export interface IgetRecs {
    recs: Array<IRec>;
    inds: Array<IInd>;
}