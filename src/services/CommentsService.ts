import $api, { apiService } from '../http';
import { AxiosResponse } from 'axios';
import { CommentsResponse } from '../models/response/CommentResponse';
import { IComment } from '../models/response/IComment';

export default class CommentsService {
  static async getComments(): Promise<AxiosResponse<CommentsResponse>> {
    return $api.get('/service2/comments');
  }

  static async getComment(commentId: string): Promise<AxiosResponse<IComment>> {
    return $api.get('/service2/comments/' + commentId);
  }

  static async getCommentBySender(
    senderId: string,
  ): Promise<AxiosResponse<IComment>> {
    return $api.get(`/service2/comments/by-sender/${senderId}`);
  }
  static async getCommentByGroup(groupId: string): Promise<AxiosResponse<IComment[]>> {
    return $api.get(`/service2/comments/by-group/${groupId}`);
  }

  static async createComments(
    msg: string,
    groupId: string,
    senderId: string,
    fileList: File[],
  ): Promise<AxiosResponse<CommentsResponse>> {
    const formData = new FormData();
    formData.append('msg', msg);
    formData.append('senderId', senderId);
    formData.append('groupId', groupId);
    if (fileList) {
      fileList.map((file) => {
        formData.append('file', file);
      });
    }
    return $api.post(`/${apiService}/comments`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async editComment(
    commentId: string,
    newText: string,
  ): Promise<AxiosResponse<IComment>> {
    return $api.put(`/service2/comments/${commentId}`, { msg: newText });
  }
  static changeStatusComment(
    commentId: string,
    status: string,
  ): Promise<AxiosResponse<IComment>> {
    return $api.put(`/service2/comments/${commentId}/change-status`, {
      status: status,
    });
  }
  static async deleteComments(commentId: string): Promise<AxiosResponse> {
    return $api.delete('/service2/comments/' + commentId);
  }

  static async addBonusToUser(
    userId: string,
    commentId: string,
    bonusForComment: number,
  ): Promise<AxiosResponse> {
    const response = await $api.post('/service2/comments/add-bonus', {
      userId,
      commentId,
      bonusForComment,
    });
    return response;
  }
}
