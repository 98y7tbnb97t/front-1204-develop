import { AxiosResponse } from 'axios';
import $api, { apiService } from '../http';
import {
  IgetMaterial,
  IgetMaterials,
  IgetTheme,
  IgetThemes,
} from '../models/response/ProgramResponses';
import { ITheme } from '../models/Program/ITheme';

export default class ProgramService {
  static async getThemes(payload: object): Promise<AxiosResponse<IgetThemes>> {
    return $api.get<IgetThemes>(`/${apiService}/program/theme`, {
      params: payload,
    });
  }

  static async createTheme(
    name: string,
    filter: string,
    level: number,
    order: number,
  ): Promise<AxiosResponse<IgetThemes>> {
    return $api.post<IgetThemes>(
      `/${apiService}/program/theme`,
      { name: name, filter: filter, level: level, order },
      { withCredentials: true },
    );
  }

  static async updateThemeOrders(
    themes: IgetThemes,
  ): Promise<AxiosResponse<IgetThemes>> {
    return $api.put<IgetThemes>(
      `/${apiService}/program/theme/update-orders`,
      themes,
      { withCredentials: true },
    );
  }

  static async getMaterials(
    theme_id: string,
  ): Promise<AxiosResponse<IgetMaterials>> {
    return $api.get<IgetMaterials>(`/${apiService}/program/material`, {
      params: { theme_id },
    });
  }
  static async createMaterial(
    theme_id: string,
    pgn: string,
  ): Promise<AxiosResponse<IgetMaterial>> {
    return $api.post<IgetMaterial>(
      `/${apiService}/program/material`,
      { theme_id: theme_id, pgn: pgn },
      { withCredentials: true },
    );
  }
  static async createCustomMaterial(
    theme_id: string,
    fen: string,
    custom: [{ square: string; type: string }],
    theory?: string,
  ): Promise<AxiosResponse<IgetMaterial>> {
    return $api.post<IgetMaterial>(
      `/${apiService}/program/custom_material`,
      { theme_id: theme_id, fen: fen, custom: custom, theory: theory },
      { withCredentials: true },
    );
  }
  static async editCustomMaterial(
    material_id: string,
    fen: string,
    custom: [{ square: string; type: string }],
    theory?: string,
  ): Promise<AxiosResponse<IgetMaterial>> {
    return $api.put<IgetMaterial>(
      `/${apiService}/program/custom_material/` + material_id,
      { fen: fen, custom: custom, theory: theory },
      { withCredentials: true },
    );
  }
  static async editTheme(
    themeId: string,
    line?: string,
    filter?: string,
    name?: string,
    order?: number,
    seq?: { oldseq: number; seq: number },
    level?: number,
  ): Promise<AxiosResponse<IgetThemes & {allThemes: ITheme[]}>> {
    const payload = {} as {
      name?: string;
      line?: string;
      seq?: { oldseq: number; seq: number };
      filter?: string;
      level?: number;
      order?: number;
    };
    if (name) {
      payload.name = name;
    }
    if (line) {
      payload.line = line;
    }
    if (seq) {
      payload.seq = seq;
    }
    if (filter) {
      payload.filter = filter;
    }
    if (level) {
      payload.level = level;
    }
    if (order) {
      payload.order = order;
    }
    return $api.put<IgetThemes & {allThemes: ITheme[]}>(
      `/${apiService}/program/theme/` + themeId,
      payload,
      { withCredentials: true },
    );
  }
  static async deleteTheme(themeId: string): Promise<AxiosResponse<IgetTheme>> {
    return $api.delete<IgetTheme>(`/${apiService}/program/theme/` + themeId, {
      withCredentials: true,
    });
  }
  static async deleteMaterial(
    materialId: string,
  ): Promise<AxiosResponse<IgetMaterial>> {
    return $api.delete<IgetMaterial>(
      `/${apiService}/program/material/` + materialId,
      { withCredentials: true },
    );
  }
}
