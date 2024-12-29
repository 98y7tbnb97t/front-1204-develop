import { AxiosResponse } from 'axios';
import $api from '../http/index';
import { IAutoSMSTemplate } from '../models/IAutoSMS';

class AutoSMSTemplatesService {
  static async getAutoSMSTemplates(): Promise<AxiosResponse<IAutoSMSTemplate[]>> {
		return await $api.get('/service1/autosmsTemplates/');
	}
  static async createAutoSMSTemplate(
    autoSMSTemplate: Omit<IAutoSMSTemplate, '_id'>
    ): Promise<AxiosResponse<IAutoSMSTemplate>> {
    return await $api.post('/service1/autosmsTemplates/', autoSMSTemplate);
  }
  static async editAutoSMSTemplate(
    autoSMSTemplate: IAutoSMSTemplate
    ): Promise<AxiosResponse<IAutoSMSTemplate>> {
    return await $api.put(`/service1/autosmsTemplates/${autoSMSTemplate._id}`, autoSMSTemplate);
  }
  static async deleteAutoSMSTemplate(autoSMSTemplateId: string): Promise<AxiosResponse<IAutoSMSTemplate>> {
    return await $api.delete(`/service1/autosmsTemplates/${autoSMSTemplateId}`);
  }
}

export default AutoSMSTemplatesService;

