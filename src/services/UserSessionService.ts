import { AxiosResponse } from 'axios';
import $api from '../http';
import { SessionResponse } from '../models/response/SessionResponse';

export default class UserSessionService {
  static async getSession(
    userId: string,
  ): Promise<AxiosResponse<SessionResponse>> {
    return $api.get<SessionResponse>(`/service1/session?userId=${userId}`);
  }
  static async createSession(
    userId: string,
  ): Promise<AxiosResponse<SessionResponse>> {
    return $api.post<SessionResponse>('/service1/session', { userId });
  }
  static async addUserToSession(
    sessionId: string,
    userId: string,
  ): Promise<AxiosResponse<SessionResponse>> {
    return $api.put<SessionResponse>('/service1/session', {
      sessionId,
      userId,
    });
  }
  static async removeUserFromSession(
    userId: string,
  ): Promise<AxiosResponse<SessionResponse>> {
    return $api.delete<SessionResponse>(`/service1/session/${userId}`);
  }
}
