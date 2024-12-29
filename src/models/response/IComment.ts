import { IAttachment } from "../IAttachment";


export interface IComment {
  _id: string;
  msg: string;
createdAt: Date;
  group_id: string;
  attachments: IAttachment[];
  from: any;
  type: string;
 timeOfPayed?: Date;
  status: string;
  bonusForComment: number
  
}
