import $api, {apiService} from "../http";
import { AxiosResponse } from 'axios';
import { IgetTestLesson, IgetTestLessonHistory } from "../models/response/TestLessonResponses";
import { ITestLessonEdit } from "../models/ITestLesson";
import { IgetUsers } from "../models/response/PermissionsResponses";

export default class TestLessonService {
    static async getGroup(lessonId: string): Promise<AxiosResponse<IgetTestLesson>> {
        return $api.get<IgetTestLesson>(`/${apiService}/testlesson/`+lessonId);
    }
    static async createGroup(): Promise<AxiosResponse<IgetTestLesson>> {
        return $api.post<IgetTestLesson>(`/${apiService}/testlesson`, {}, {withCredentials: true })
    }
    static async editGroup(lessonId: string, payload?: ITestLessonEdit): Promise<AxiosResponse<IgetTestLesson>> {
        return $api.put<IgetTestLesson>(`/${apiService}/testlesson/`+lessonId, payload, {withCredentials: true })
    }
    static async addTestUserComment(test_user_id: string, comment: string): Promise<AxiosResponse<IgetTestLesson>> {
        return $api.post<IgetTestLesson>(`/${apiService}/testlesson/comment`, {test_user_id: test_user_id, comment: comment}, {withCredentials: true })
    }
    static async mergeUsers(test_user_id: string, user_id: string): Promise<AxiosResponse<IgetUsers>> {
        return $api.post<IgetUsers>(`/${apiService}/testlesson/mergeusers`, {test_user_id, user_id}, {withCredentials: true })
    }
    static async unMergeUsers(test_user_id: string): Promise<AxiosResponse<IgetUsers>> {
        return $api.post<IgetUsers>(`/${apiService}/testlesson/unmergeusers`, {test_user_id}, {withCredentials: true })
    }
    static async getTestLessonHistory(test_user_id: string): Promise<AxiosResponse<IgetTestLessonHistory>> {
        return $api.get<IgetTestLessonHistory>(`/${apiService}/testlesson/history/`+test_user_id);
    }
    static async editTestUser(test_user_id: string, name: string, sname: string): Promise<AxiosResponse<IgetUsers>> {
        return $api.put<IgetUsers>(`/${apiService}/testlesson/edittestuser/`+test_user_id, {name, sname});
    }
}