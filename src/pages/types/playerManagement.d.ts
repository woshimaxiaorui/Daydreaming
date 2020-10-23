import { IResponse } from '@/pages/types/public';

export interface IPlayerTable {
  nickname: string;
  phone: string;
  killerIntegral: string;
  detectiveIntegral: string;
  peopleIntegral: string;
  totalIntegral: string;
  activeIntegral: string;
  sex?: string;
  remark?: string;
  id?: string;
  key?: string;
}

export interface IPlayerResponse extends IResponse {
  data: IPlayerTable[]
}

export interface IAddPlayerResponse extends IResponse {
  data: IAddPlayerExists
}

export interface IAddPlayerExists {
  phoneExists: boolean;
}

export interface ISearchPlayer {
  currentPage: number;
  pageRecords: number;
  name?: string;
  phoneNumber?: string;
}
