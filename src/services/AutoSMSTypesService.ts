import { AxiosResponse } from 'axios';
import $api from '../http/index';
import { IAutoSMSType } from '../models/IAutoSMS';

class AutoSMSTypesService {
  static async getAutoSMSTypes(): Promise<AxiosResponse<IAutoSMSType[]>> {
		return await $api.get('/service1/autosmstypes/');
	}
  static async createAutoSMSType(
    autoSMSType: Omit<IAutoSMSType, '_id'>
    ): Promise<AxiosResponse<IAutoSMSType>> {
    return await $api.post('/service1/autosmstypes/', autoSMSType);
  }
  static async editAutoSMSType(
    autoSMSType: IAutoSMSType
    ): Promise<AxiosResponse<IAutoSMSType>> {
    return await $api.put(`/service1/autosmstypes/${autoSMSType._id}`, autoSMSType);
  }
  static async deleteAutoSMSType(autoSMSTypeId: string): Promise<AxiosResponse<IAutoSMSType>> {
    return await $api.delete(`/service1/autosmstypes/${autoSMSTypeId}`);
  }
}

export default AutoSMSTypesService;

