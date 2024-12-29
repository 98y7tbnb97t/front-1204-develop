export interface ITeam {
  id: string,
  color: ColorsEnum,
  name: string
}

export enum ColorsEnum {
  BLACK = 'black',
  WHITE = 'white'
}

export interface ColorItemType {
  id: string,
  name: string,
  color: ColorsEnum
}

export interface PlayerItemType {
  id: string,
  name: string,
  isPlaying: boolean
}

export interface ITeamsGame {
  teams: ITeam[];
  movesCount: number;
}