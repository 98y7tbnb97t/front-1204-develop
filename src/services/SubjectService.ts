import { AxiosResponse } from 'axios';
import $api from '../http/index';
import { ISubject } from '../models/ISubject';

class SubjectService {
  static async getSubjects(): Promise<AxiosResponse<ISubject[]>> {
		return await $api.get('/service1/subject/');
	}
  static async createSubject(
    subject: Omit<ISubject, '_id'>
    ): Promise<AxiosResponse<ISubject>> {
    return await $api.post('/service1/subject/', subject);
  }
  static async editSubject(
    subject: ISubject
    ): Promise<AxiosResponse<ISubject>> {
    return await $api.put(`/service1/subject/${subject._id}`, subject);
  }
  static async deleteSubject(subjectId: string): Promise<AxiosResponse<ISubject>> {
    return await $api.delete(`/service1/subject/${subjectId}`);
  }
}

export default SubjectService;

