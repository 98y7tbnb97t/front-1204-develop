import $api from "../http";
import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import { seansPlayingData, seansResultsReq, seansUpdateGameData } from "../models/seans/Seans";

export default class SeansService {
    static async getAllSeans(data: {teacherId?:string; groupId?:string;}): Promise<any> {
        return $api.get<AuthResponse>('/seans', {params: data})
    }
    static async getOneSeans(seansId:string|undefined): Promise<AxiosResponse<any>> {
        return $api.get<AuthResponse>('/seans/one', {params: {seansId}})
    }
    static async createSeans(data:any): Promise<AxiosResponse<any>> {
        return $api.post<AuthResponse>('/seans', data)
    }
    static async studentJoin(data:any): Promise<AxiosResponse<any>> {
        return $api.put<AuthResponse>('/seans/student-join', data)
    }
    static async acceptPlayer(data:any): Promise<AxiosResponse<any>> {
        return $api.put<AuthResponse>('/seans/accept-player', data)
    }
    static async kickPlayer(data:any): Promise<AxiosResponse<any>> {
        return $api.put<AuthResponse>('/seans/kick-player', data)
    }
    static async leaveTheSeans(data:any): Promise<AxiosResponse<any>> {
        return $api.put<AuthResponse>('/seans/leave', data)
    }
    static async startSeans(data:any): Promise<AxiosResponse<any>> {
        return $api.patch<AuthResponse>('/seans/start', data)
    }
    static async moveSeans(data:seansPlayingData): Promise<AxiosResponse<any>> {
        return $api.patch<AuthResponse>('/seans/move', data)
    }
    static async seansUpdateGame(data:seansUpdateGameData): Promise<AxiosResponse<any>> {
        return $api.patch<AuthResponse>('/seans/updateGame', data)
    }
    static async seansResults(data:seansResultsReq): Promise<AxiosResponse<any>> {
        return $api.get<AuthResponse>('/seans/results', {params:data})
    }

    static async getGroupsForOptions(data:any): Promise<AxiosResponse<any>> {
        return $api.get<AuthResponse>('/seans/groups')
    }
    static async getTranersForOptions(data:any): Promise<AxiosResponse<any>> {
        return $api.get<AuthResponse>('/seans/traners')
    }


}