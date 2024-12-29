import { AxiosResponse } from 'axios';
import $api, { apiService } from '../http';
import { IPush } from '../models/IPush';
import {
  IcreateChat,
  IeditChatTag,
  IgetChat,
  IgetDialogs,
  IgetMessages,
  IMuteChat,
  IRemoveUserFromChat,
  IsearchDialogs,
  IsendMessage,
} from '../models/response/MessengerResponses';
import { User } from '../models/User';
import { IMessage } from '../models/IMessage';
import { MuteDurations } from '../models/IChat';

export default class DialogService {
  static async getUnreaded(): Promise<AxiosResponse<{ unreaded: string }>> {
    return $api.get<{ unreaded: string }>(`/${apiService}/dialog/getUnreaded`);
  }
  static async addStudentsToReceiptsChat(): Promise<AxiosResponse<{ usersAdded: User[] }>> {
    return $api.post<{ usersAdded: User[] }>(`/${apiService}/dialog/addStudentsToReceiptsChat`);
  }
  static async setReaction(
    msgId: string,
    reaction: {
      emoji: string,
      from: string
    }
  ): Promise<AxiosResponse<{ message: IMessage }>> {
    return $api.post<{ message: IMessage }>(`/${apiService}/dialog/setReaction`, { msgId, reaction });
  }
  static async removeReaction(
    msgId: string,
    reaction: {
      emoji: string,
      from: string
    }
  ): Promise<AxiosResponse<{ message: IMessage }>> {
    return $api.post<{ message: IMessage }>(`/${apiService}/dialog/removeReaction`, { msgId, reaction });
  }
  static async getDialogs(
    id: string,
    limit: number,
    page: number,
    searchQuery?: string,
  ): Promise<AxiosResponse<IgetDialogs>> {
    return $api.get<IgetDialogs>(`/${apiService}/dialog/getDialogs`, {
      params: { id, limit, page, searchQuery },
    });
  }
  
  static async getDialogsArchived(): Promise<AxiosResponse<IgetDialogs>> {
    return $api.get<IgetDialogs>(`/${apiService}/dialog/getDialogsArchived`);
  }
  static async getChat(
    id: string
  ): Promise<AxiosResponse<IgetChat>> {
    return $api.get<IgetChat>(`/${apiService}/dialog/chat`, {
      params: { id },
    });
  }

  static async getMessages(
    id: string,
    offset: number,
    limit?  : number
  ): Promise<AxiosResponse<IgetMessages>> {
    return $api.get<IgetMessages>(`/${apiService}/dialog/chat/messages`, {
      params: { id, offset, limit },
    });
  }

  static async getNotifications(
    user_id: string,
  ): Promise<AxiosResponse<IgetMessages>> {
    return $api.get<IgetMessages>(`/${apiService}/dialog/chat/notifications`, {
      params: { user_id },
    });
  }

  static async getUnreadedNotificationsCount(
    user_id: string,
  ): Promise<AxiosResponse<number>> {
    return $api.get<number>(`/${apiService}/dialog/chat/unreadedNotificationsCount`, {
      params: { user_id },
    });
  }

  static async createChat(
    name: string,
    description: string,
    anonim: boolean,
    showNames: boolean,
    emails?: string[],
  ): Promise<AxiosResponse<IcreateChat>> {
    return $api.post<IcreateChat>(
      `/${apiService}/dialog/chat`,
      { name: name, description: description, anonim: anonim, emails, showNames },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }
  static async deleteChat(chatId: string): Promise<AxiosResponse<IgetChat>> {
    return $api.delete<IgetChat>(`/${apiService}/dialog/chat/` + chatId, {
      withCredentials: true,
    });
  }
  static async editChat(
    dialog_id: string,
    name?: string,
    description?: string,
    avatar?: File | undefined,
    archive?: boolean,
    anonim?: boolean,
  ): Promise<AxiosResponse<IcreateChat>> {
    const formData = new FormData();
    if (name) {
      formData.append('name', name);
    }
    if (description) {
      formData.append('description', description);
    }
    formData.append('dialog_id', dialog_id);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    if (archive === true) {
      formData.append('archive', 'true');
    } else if (archive === false) {
      formData.append('archive', 'false');
    }
    if (anonim === true) {
      formData.append('anonim', 'true');
    } else if (anonim === false) {
      formData.append('anonim', 'false');
    }
    return $api.put<IcreateChat>(`/${apiService}/dialog/chat`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  static async addUserToChat(
    email: string,
    dialog_id: string,
  ): Promise<AxiosResponse<IcreateChat>> {
    return $api.post<IcreateChat>(
      `/${apiService}/dialog/addto`,
      { email: email, dialog_id: dialog_id },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }
  static async addUsersToChat(
    emails: string[],
    dialog_id: string,
  ): Promise<AxiosResponse<IcreateChat>> {
    return $api.post<IcreateChat>(
      `/${apiService}/dialog/addusersto`,
      { emails: emails, dialog_id: dialog_id },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }
  static async removeUserFromChat(
    _id: string,
    dialog_id: string,
  ): Promise<AxiosResponse<IRemoveUserFromChat>> {
    return $api.post<IRemoveUserFromChat>(
      `/${apiService}/dialog/removefrom`,
      { _id: _id, dialog_id: dialog_id },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }
  static async sendMessage(
    msg: string,
    to: string,
    audio: Blob | undefined,
    fileList: File[],
    reply: string | null,
  ): Promise<AxiosResponse<IsendMessage>> {
    const formData = new FormData();
    formData.append('msg', msg);
    formData.append('to', to);
    if (audio) {
      formData.append('audio', audio, 'audio.webm');
    } else {
      fileList.map((file) => {
        formData.append('file', file);
      });
      if (reply) {
        formData.append('reply', reply);
      }
    }
    return $api.post<IsendMessage>(
      `/${apiService}/dialog/sendMessage`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }
  static async editMessage(
    msg_id: string,
    msg: string,
    fileList: File[],
  ): Promise<AxiosResponse<IsendMessage>> {
    const formData = new FormData();
    formData.append('msg_id', msg_id);
    formData.append('msg', msg);
    fileList.map((file) => {
      formData.append('file', file);
    });
    return $api.put<IsendMessage>(
      `/${apiService}/dialog/sendMessage`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }
  static async deleteMessage(
    msg_id: string,
    dialog_id: string,
  ): Promise<AxiosResponse<IsendMessage>> {
    return $api.delete<IsendMessage>(`/${apiService}/dialog/sendMessage`, {
      params: { dialog_id, msg_id },
    });
  }
  static async searchDialogs(
    value: string,
  ): Promise<AxiosResponse<IsearchDialogs>> {
    return $api.get<IsearchDialogs>(`/${apiService}/dialog/searchDialogs`, {
      params: { value },
    });
  }
  static async editChatTag(
    dialog_id: string,
    name: string,
  ): Promise<AxiosResponse<IeditChatTag>> {
    return $api.post<IeditChatTag>(
      `/${apiService}/dialog/chatCategory`,
      { dialog_id: dialog_id, name: name },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }

  static async sendPush(
    msg: string,
    to: string,
    userId: string,
  ): Promise<AxiosResponse<IPush>> {
    const formData = new FormData();
    formData.append('msg', msg);
    formData.append('to', to);
    formData.append('userId', userId);

    return $api.post<IPush>(`/service1/fcm/push`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async muteChat(
    chat_id: string,
    duration: MuteDurations
  ): Promise<AxiosResponse<IMuteChat>> {
    return $api.put<IMuteChat>(
      `/${apiService}/dialog/mute/${chat_id}`,
      { duration },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }
  
  static async unMuteChat(
    chat_id: string
  ): Promise<AxiosResponse<IMuteChat>> {
    return $api.put<IMuteChat>(
      `/${apiService}/dialog/unmute/${chat_id}`,
      {},
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    )
  }
}
