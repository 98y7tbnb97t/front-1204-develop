import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  IgetVideo,
  IgetVideoCounter,
  IgetVideos,
} from '../models/response/VideoResponses';

export default class VideoService {
  static async getVideos(
    group_id?: string,
  ): Promise<AxiosResponse<IgetVideos>> {
    return $api.get<IgetVideos>('/service1/videos', { params: { group_id } });
  }
  static async getVideo(videoId: string): Promise<AxiosResponse<IgetVideo>> {
    return $api.get<IgetVideo>('/service1/video/' + videoId);
  }
  // Old videoService for upload files under comments
  // static async uploadVideo(groupId: string, file: File): Promise<AxiosResponse<IgetVideo>> {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     return $api.post<IgetVideo>('/service1/video/'+groupId, formData, {withCredentials: true, headers: { "Content-Type": "multipart/form-data" }});
  // }

  static async getCounters(): Promise<AxiosResponse<IgetVideoCounter>> {
    return $api.get<IgetVideoCounter>('/service1/videocounters');
  }
}
