import { AxiosResponse } from 'axios';
import $api, { apiService } from '../http';
import { AuthResponse } from '../models/response/AuthResponse';
import { EditUserReQData } from '../models/response/EditUserReqData';

export default class AuthService {
  static async registration(
    email: string,
    name: string,
    sname: string,
    password: string,
    timeZone: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/service1/auth/registration', {
      email,
      name,
      sname,
      password,
      timeZone
    });
  }

  static async registrationTestUser(
    name: string,
    sname: string,
    test_lesson_id: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/service1/auth/registration_testuser', {
      name,
      sname,
      test_lesson_id
    });
  }

  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/service1/auth/login', { email, password });
  }

  static async login_lichess(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/service1/auth/login_lichess');
  }

  static async getUsers(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get(`/${apiService}/auth/users`);
  }

  static async getTrustLessonDates(id: string): Promise<AxiosResponse<{ trustLessonDates: Date[]}>> {
    return $api.get(`/service1/auth/user/${id}/getTrustLessonDates`);
  }

  static async editlevel(data): Promise<AxiosResponse<AuthResponse>> {
    return $api.put('/service1/auth/level', data);
  }

  static async logout(): Promise<void> {
    return $api.post('/service1/auth/logout');
  }

  static async setTimeZone(timeZone: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.patch('/service1/auth/user/timeZone', { timeZone });
  }
  static async setBrowserTimeZone(timeZone: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.patch('/service1/auth/user/browserTimeZone', { timeZone });
  }

  static async editUser(
    data: EditUserReQData,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.put<AuthResponse>('/service1/auth/user', data);
  }
  static async setRequizits(
    type: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/service1/auth/setrequizits', {
      type: type,
    });
  }
  static async deleteAcceptedRequests(
    id: string,
    isRequisite?: boolean,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.put<AuthResponse>(
      `/service1/auth/user/accept/${id}${isRequisite ? '?requisite=true' : ''}`,
      {},
    );
  }

  static async switchUser(
    userId: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/service1/session/switch', { userId });
  }
}
