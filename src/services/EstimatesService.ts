import $api from '../http';
import { AxiosResponse } from 'axios';
import { IEstimate} from '../models/IEstimate';

export default class EstimatesService {
  static async createEstimate(data: IEstimate ): Promise<AxiosResponse<{ estimate: IEstimate }>> {
    return $api.post('/service1/estimates/', data, {
      withCredentials: true,
    });
  }
  static async getEstimates(searchQuery: string): Promise<AxiosResponse<{ estimates: IEstimate[] }>> {
    return $api.get('/service1/estimates/', {
      params: { searchQuery }
    });
  }
  static async getEstimate(estId: string): Promise<AxiosResponse<{ estimate: IEstimate }>> {
    return $api.get(`/service1/estimates/${estId}`);
  }
  static async deleteAll(): Promise<AxiosResponse<{}>> {
    return $api.post('/service1/estimates/deleteall');
  }
  static async setAdmComment(
    estimateId: string,
    reviewId: string,
    admCommentTranerCanSee: boolean,
    admCommentParentsCanSee: boolean,
    admCommentOtherCanSee: boolean,
    parentsCanSee: boolean,
    tranerCanSee: boolean,
    comment: string
  ): Promise<AxiosResponse<{ estimate: IEstimate }>> {
    return $api.patch(`/service1/estimates/admcomment/${estimateId}/${reviewId}`, {
      comment,
      admCommentTranerCanSee,
      admCommentParentsCanSee,
      admCommentOtherCanSee,
      parentsCanSee,
      tranerCanSee
    }, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}