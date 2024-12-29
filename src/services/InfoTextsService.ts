import $api from '../http';
import { AxiosResponse } from 'axios';
import {
  IEditInfoText,
  IGetInfoText,
  IResponseAdvicesForParents,
  IResponseAdvicesForTraners,
  IResponseHomeworkText,
} from '../models/response/InfoTextsResponses';
import { AdvicesForParentsData, AdvicesForTranersData } from '../models/IInfoTexts';



export default class InfoTextsService {
  static async getInfoText(field: string): Promise<AxiosResponse<IGetInfoText>> {
    return $api.get<IGetInfoText>(`/service1/infotexts/getInfoText?field=${field}`);
  }

  static async editInfoText(
    payload?: IEditInfoText,
  ): Promise<AxiosResponse<IEditInfoText>> {
    return $api.put<IEditInfoText>('/service1/infotexts/editInfoText', payload, {
      withCredentials: true,
    });
  }

  static async saveAdvicesForTraners(data: AdvicesForTranersData & {videoFiles: {videoId: string, file: File}[], videosToDelete: string[] }): Promise<AxiosResponse<IResponseAdvicesForTraners>> {
    const formData = new FormData();
    formData.append('field', 'advicesForTranersTexts');
    formData.append('text', JSON.stringify(data));
    data.videoFiles.map((video) => {
      formData.append('videos', video.videoId);
      formData.append('files', video.file);
    });
    formData.append('videosToDelete', JSON.stringify(data.videosToDelete));
    return $api.put('/service1/infotexts/saveAdvicesForTraners', formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async saveAdvicesForParents(data: AdvicesForParentsData & {videoFiles: {videoId: string, file: File}[], videosToDelete: string[] }): Promise<AxiosResponse<IResponseAdvicesForParents>> {
    const formData = new FormData();
    formData.append('field', 'advicesForParentsTexts');
    formData.append('text', JSON.stringify(data));
    data.videoFiles.map((video) => {
      formData.append('videos', video.videoId);
      formData.append('files', video.file);
    });
    formData.append('videosToDelete', JSON.stringify(data.videosToDelete));
    return $api.put('/service1/infotexts/saveAdvicesForParents', formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async getAdvicesForParents(): Promise<AxiosResponse<IResponseAdvicesForParents>> {
    return $api.get<IResponseAdvicesForParents>(`/service1/infotexts/getInfoText?field=advicesForParentsTexts`);
  }

  static async getAdvicesForTraners(): Promise<AxiosResponse<IResponseAdvicesForTraners>> {
    return $api.get<IResponseAdvicesForTraners>(`/service1/infotexts/getInfoText?field=advicesForTranersTexts`);
  }

  static async saveHomeworkText(data: string): Promise<AxiosResponse<IResponseHomeworkText>> {
    return $api.put('/service1/infotexts/editInfoText', {
      field: 'homeworkText',
      text: data,
    });
  }

  static async getHomeworkText(): Promise<AxiosResponse<IResponseHomeworkText>> {
    return $api.get<IResponseHomeworkText>(`/service1/infotexts/getInfoText?field=homeworkText`);
  }
  
  static async searchInfoTexts(query: string): Promise<AxiosResponse<{ fields: string[]}>> {
    return $api.get<{ fields: string[]}>(`/service1/infotexts/searchInfoTexts`, {
      params: {
        query
      }
    })
  }
}