import { IResponse } from '@/pages/types/public';
import { ISystemUserTable } from '@/pages/types/userManagement';

export interface IStoreTable {
  storeName: string;
  bossId: string;
  bossInfo: ISystemUserTable;
  phoneNumber: string;
  address: string;
  status: boolean;
  id?: string;
  key?: string;
}

export interface IStoreResponse extends IResponse {
  data: IStoreTable[];
  dataCount: number;
  pageCount: number;
}

export interface IAddStoreResponse extends IResponse {
  data: IAddStoreExists
}

export interface IAddStoreExists {
  userNameExists?: boolean;
  storeNameExists: boolean;
}

export interface ISearchStore {
  currentPage: number;
  pageRecords: number;
  userName?: string;
  storeName?: string;
  status?: boolean;
  phoneNumber?: string;
}
