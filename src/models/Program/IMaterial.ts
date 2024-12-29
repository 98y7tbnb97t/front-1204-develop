import { IMaterialData } from './IMaterialData';

export interface IMaterial {
  _id: string;
  data: IMaterialData;
  theme_id: { _id: string; name: string };
  type: string;
  seq: number;
  custom: [{ square: string; type: string }];
}

export interface IMaterialResponse {
  _id: string;
  data: IMaterialData;
  theme_id: string;
  type: string;
  seq: number;
  custom: [{ square: string; type: string }];
}
