import $api, {apiService} from "../http";
import { AxiosResponse } from 'axios';
import {IRequisite} from "../models/IRequisite.ts";
import {IChat} from "../models/IChat.ts";
import { ECountries } from "../models/ECountries.ts";

export interface ICreateBalancePayload {
    bic: string,
    accountNumber: string,
    card: string,
    ownerEn: string,
    ownerRu: string,
    cardType: string,
    countries: ECountries[]
}

export default class BalanceService {
    static async getRequisites(): Promise<AxiosResponse<{ data: IRequisite[],chatForChecks: IChat }>> {
        return $api.get<{ data: IRequisite[],chatForChecks: IChat }>(`/${apiService}/requisites/`);
    }

    static async createRequisite(data: ICreateBalancePayload): Promise<AxiosResponse<{ data: IRequisite }>> {
        return $api.post<{ data: IRequisite }>(`/${apiService}/requisites/create`,data);
    }

    static async editRequisite(data: ICreateBalancePayload,id: string): Promise<AxiosResponse<{ data: IRequisite }>> {
        return $api.put<{ data: IRequisite,id: string }>(`/${apiService}/requisites/${id}`,data);
    }

    static async deleteRequisite(id: string): Promise<AxiosResponse<{ data: IRequisite }>> {
        return $api.delete<{ data: IRequisite,id: string }>(`/${apiService}/requisites/${id}`);
    }
}