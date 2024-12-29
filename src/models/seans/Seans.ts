import { Square } from 'chess.js';

export type TimerGoingOn = "none" | "white" | "black" | "timeout";

export interface seansPlayingData {
  seansId: string | undefined;
  userId: string | undefined;
  fen: string;
  game: { from: Square; to: Square; promotion?: any };
  move: string;
  hasCapture?:boolean;
  whiteTimer?: string;
  blackTimer?: string;
  whiteCaptures?: string[];
  blackCaptures?: string;
  timerGoingOn?: TimerGoingOn;
}

export interface seansUpdateGameData {
  seansId: string | undefined;
  userId: string | undefined;
  fen: string;
  statusGame: string;
  statusSeans?: string;
  timerGoingOn?: TimerGoingOn;
}

export interface seansResultsReq {
  startDate: Date | null;
  endDate: Date | null;
  seanserId?: string | undefined;
}
