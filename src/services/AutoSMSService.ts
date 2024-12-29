import { AxiosResponse } from 'axios';
import $api from '../http/index';
import { IAutoSMS } from '../models/IAutoSMS';

class AutoSMSService {
  static async getAllAutoSMS({ dialog_id, user_id, isPrivate, isForDialogs, isForGroups, isForHomeworks } : { dialog_id?: string, user_id?: string, isPrivate?: boolean, isForDialogs?: boolean, isForGroups?: boolean, isForHomeworks?: boolean }): Promise<AxiosResponse<IAutoSMS[]>> {
		return await $api.get('/service1/autosms/', { params: { dialog_id, user_id, isPrivate, isForDialogs, isForGroups, isForHomeworks }});
	}
  static async getSchoolAutoSMS(): Promise<AxiosResponse<IAutoSMS[]>> {
		return await $api.get('/service1/autosms/schoolautosms');
	}
  static async getAutoSMSCount({ dialog_id, user_id } : { dialog_id?: string, user_id?: string}): Promise<AxiosResponse<number>> {
		return await $api.get('/service1/autosms/count', { params: { dialog_id, user_id }});
	}
  static async createAutoSMS(
    autoSMS: Omit<IAutoSMS, '_id'>
    ): Promise<AxiosResponse<IAutoSMS>> {
    return await $api.post('/service1/autosms/', autoSMS);
  }
  static async editAutoSMS(
    autoSMS: IAutoSMS
    ): Promise<AxiosResponse<IAutoSMS>> {
    return await $api.put(`/service1/autosms/${autoSMS._id}`, autoSMS);
  }
  static async toggleAutoSMS(autoSMSId: string, enabled: boolean): Promise<AxiosResponse<IAutoSMS>> {
    return await $api.patch(`/service1/autosms/${autoSMSId}/toggle`, { enabled });
  }
  static async deleteAutoSMS(autoSMSId: string): Promise<AxiosResponse<IAutoSMS>> {
    return await $api.delete(`/service1/autosms/${autoSMSId}`);
  }
}

export default AutoSMSService;

