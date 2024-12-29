import { ITheme } from '../Program/ITheme';
import { IMaterialResponse } from '../Program/IMaterial';

export interface IgetThemes {
  themes: Array<ITheme>;
}
export interface IgetTheme {
  theme: ITheme;
}
export interface IgetMaterials {
  materials: Array<IMaterialResponse>;
}
export interface IgetMaterial {
  material: IMaterialResponse[];
}
