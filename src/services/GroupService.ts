import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  IRemoveUserFromGroup,
  IUpdatePassedMaterialsResponse,
  IgetGroup,
  IgetGroups,
  IgetLogs,
  IgetRecs,
} from '../models/response/GroupResponses';
import { IGroupEdit, IProgramActionsHistory, ITimer, IUpdatePassedMaterials } from '../models/response/IGroup';
import { User } from '../models/User';

export default class GroupService {
  static async getGroups(
    archive?: boolean | string,
    search?: string,
    videocounter?: boolean,
    noStudents?: boolean,
  ): Promise<AxiosResponse<IgetGroups>> {
    const payload = {} as {
      archive?: boolean | string;
      search?: string;
      videocounter?: boolean;
      noStudents?: boolean;
    };
    if (archive === true) {
      payload.archive = true;
    } else if (archive === false) {
      payload.archive = false;
    } else if (archive === 'any') {
      payload.archive = 'any';
    }
    if (search) {
      payload.search = search;
    }
    if (videocounter === true) {
      payload.videocounter = true;
    } else if (videocounter === false) {
      payload.videocounter = false;
    }

    if (noStudents === true) {
      payload.noStudents = true;
    } else if (noStudents === false) {
      payload.noStudents = false;
    }
    return $api.get<IgetGroups>('/service1/groups', { params: payload });
  }

  static async getGroup(groupId: string): Promise<AxiosResponse<IgetGroup>> {
    return $api.get<IgetGroup>('/service1/groups/' + groupId);
  }

  static async createGroup(
      name: string,
      traners: Array<string>,
      level: string,
      starts: string,
      country: string,
      users: User[],
      format: string,
      status: string,
      dates?: 
          {
              days: number[],
              time: string
          }[],
      subject?: string
  ): Promise<AxiosResponse<IgetGroup>> {
      return $api.post<IgetGroup>('/service1/groups', {
          name,
          traners,
          level,
          starts,
          dates,
          country,
          users,
          format,
          status,
          subject
      }, {withCredentials: true})
  }

  static async editGroup(
    groupId: string,
    payload?: IGroupEdit,
  ): Promise<AxiosResponse<IgetGroup>> {
    return $api.put<IgetGroup>('/service1/groups/' + groupId, payload, {
      withCredentials: true,
    });
  }

  static async updatePassedMaterials(
    groupId: string,
    payload: IUpdatePassedMaterials['payload'],
  ): Promise<AxiosResponse<IUpdatePassedMaterialsResponse>> {
    return $api.put<IUpdatePassedMaterialsResponse>(
      `/service1/groups/${groupId}/materials`,
      payload,
      {
        withCredentials: true,
      },
    );
  }

  static async deleteGroup(groupId: string): Promise<AxiosResponse<IgetGroup>> {
    return $api.delete<IgetGroup>('/service1/groups/' + groupId);
  }

  static async addUserToGroup(
    email: string,
    group_id: string,
  ): Promise<AxiosResponse<IgetGroup>> {
    return $api.post<IgetGroup>(
      '/service1/groups/addto',
      { email: email, group_id: group_id },
      { withCredentials: true },
    );
  }

  static async addUsersToGroup(
    emails: string[],
    group_id: string,
  ): Promise<AxiosResponse<IgetGroup>> {
    return $api.post<IgetGroup>(
      '/service1/groups/addusersto',
      { emails: emails, group_id: group_id },
      { withCredentials: true },
    );
  }

  static async removeUserFromGroup(
    email: string,
    group_id: string,
  ): Promise<AxiosResponse<IRemoveUserFromGroup>> {
    return $api.post<IRemoveUserFromGroup>(
      '/service1/groups/removefrom',
      { email: email, group_id: group_id },
      { withCredentials: true },
    );
  }

  static async getLogs(type: string): Promise<AxiosResponse<IgetLogs>> {
    return $api.get<IgetLogs>('/service1/groupslogs', { params: { type } });
  }

  static async getRecs(id: string): Promise<AxiosResponse<IgetRecs>> {
    return $api.get<IgetRecs>('/service1/groupsrec', { params: { id } });
  }

  static async putOffMaterial(
    groupId: string,
    themeIds: string[],
    materialIds: string[],
    date: string,
  ): Promise<AxiosResponse<IUpdatePassedMaterialsResponse>> {
    return $api.post<IUpdatePassedMaterialsResponse>(`/service1/putoffmaterial`, {
      groupId,
      themeIds: themeIds,
      materialIds: materialIds,
      date
    }, {
      withCredentials: true,
    });
  }

  static async removeFromPostponedMaterials(
    groupId: string,
    themeIds: string[],
    materialIds: string[],
  ): Promise<AxiosResponse<IUpdatePassedMaterialsResponse>> {
    return $api.post<IUpdatePassedMaterialsResponse>(`/service1/removeFromPostponedMaterials`, {
      groupId,
      themeIds: themeIds,
      materialIds: materialIds,
    }, {
      withCredentials: true,
    });
  }
  static async getPostponedMaterials(
    groupId: string,
  ): Promise<AxiosResponse<{timer: ITimer[]}>> {
    return $api.get<{timer: ITimer[]}>(`/service1/getPostponedMaterials/${groupId}`);
  }
  static async getProgramActionsHistory(
    groupId: string,
  ): Promise<AxiosResponse<{programActionsHistory: IProgramActionsHistory}>> {
    return $api.get<{programActionsHistory: IProgramActionsHistory}>(`/service1/programActionsHistory/${groupId}`);
  }
  static async cancelProgramAction(
    groupId: string,
    actionId: string,
    section: 'homework' | 'program',
  ): Promise<AxiosResponse<IUpdatePassedMaterialsResponse>> {
    return $api.put<IUpdatePassedMaterialsResponse>(`/service1/programActionsHistory/${groupId}/${actionId}`, {
      section
    });
  }
  static async removePostponedMaterial(
    groupId: string,
    themeId: string,
    materialId: string,
  ): Promise<AxiosResponse<{timer: ITimer[]}>> {
    return $api.delete<{timer: ITimer[]}>(`/service1/removePostponedMaterial/${groupId}`, {
      params: {
        themeId,
        materialId
      }
    });
  }
}
