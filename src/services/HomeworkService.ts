import $api from "../http";
import { AxiosResponse } from 'axios';
import { IgetHomeworks, IgetHomework } from "../models/response/HomeworkResponses";
import { IGroupEdit } from "../models/response/IGroup";

export default class HomeworkService {
    static async getHomeworks(group_id ?: string, page?: number, per_page = 20): Promise<AxiosResponse<IgetHomeworks>> {
        return $api.get<IgetHomeworks>('/service1/homework', {params: {group_id, page, per_page}})
    }
    static async getTestHomeworks(test_user_id: string, page?: number, per_page = 20): Promise<AxiosResponse<IgetHomeworks>> {
        return $api.get<IgetHomeworks>('/service1/test_homework', {params: {test_user_id, page, per_page}})
    }
    static async getHomework(homeworkId: string): Promise<AxiosResponse<IgetHomework>> {
        return $api.get<IgetHomework>('/service1/homework/'+homeworkId);
    }

    static async createHomework(group_id: string, end: Date, program: Array<string>, autocheck: boolean, tranersComment?: string, time?: string): Promise<AxiosResponse<IgetHomework>> {
        return $api.post<IgetHomework>('/service1/homework', {group_id: group_id, end: end, program: program, autocheck: autocheck, tranersComment, time}, {withCredentials: true })
    }
    static async createTestHomework(test_users: string[], end: Date, program: Array<string>, autocheck: boolean): Promise<AxiosResponse<IgetHomework>> {
        return $api.post<IgetHomework>('/service1/test_homework', {test_users, end: end, program: program, autocheck: autocheck}, {withCredentials: true })
    }
    static async editHomework(homeworkId: string, payload?: IGroupEdit): Promise<AxiosResponse<IgetHomework>> {
        return $api.put<IgetHomework>('/service1/homework/'+homeworkId, payload, {withCredentials: true })
    }
    static async sendHomework(group_id: string, homework_id: string, results?: [{user_id: string, material: string, result: string}]): Promise<AxiosResponse<IgetHomework>> {
        return $api.post<IgetHomework>('/service1/homework/send/'+group_id, {homework_id: homework_id, results: results}, {withCredentials: true })
    }
    static async toLessonHomework(group_id: string): Promise<AxiosResponse<IgetHomework>> {
        return $api.post<IgetHomework>('/service1/homework/tolesson/'+group_id, {}, {withCredentials: true })
    }
}