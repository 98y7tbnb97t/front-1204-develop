import { IChat } from '../IChat';
import { User } from '../User';
import { IMessage } from '../IMessage';
import { IDialogType } from '../IDialogType';

export interface IgetDialogs {
  chats: Array<IChat>;
}
export interface IgetChat {
  _id: string;
  user: User;
  messages: Array<IMessage>;
  isGroup: boolean;
  description: string;
  tagId?: string;
  users?: Array<User>;
  isChanel: boolean;
  formerParticipants?: User[];
}

export interface IgetMessages {
  messages: IMessage[];
}
export interface IcreateChat {
  dialog: IChat;
}

export interface RemoveFromUserFromChatDialog extends Omit<IChat, 'users'> {
  users: string[];
} 

export interface IRemoveUserFromChat {
  dialog: RemoveFromUserFromChatDialog;
}

export interface IsendMessage {
  message: IMessage;
}
export interface IsearchDialogs {
  dialogs: Array<IChat>;
}
export interface IeditChatTag {
  dialog_types: IDialogType[];
}
export interface IMuteChat {
  dialog: IChat;
}