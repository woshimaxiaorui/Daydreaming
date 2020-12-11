import { IResponse } from '@/pages/types/public';
import { IUserTable } from '@/pages/types/userManagement';

export interface IPlayerTable extends IUserTable {
  killerIntegral: string;
  detectiveIntegral: string;
  peopleIntegral: string;
  totalIntegral: string;
  activeIntegral: string;
  // nickname: string;
  // phone: string;
  // sex?: string;
  // remark?: string;
  // id?: string;
  // key?: string;
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
