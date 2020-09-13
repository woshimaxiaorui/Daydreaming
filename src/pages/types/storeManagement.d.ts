import { IResponse } from '@/pages/types/public';

export interface IStoreTable {
  storeName: string;
  userName: string;
  realName: string;
  passWord: string;
  phoneNumber: string;
  address: string;
  status: boolean;
  id?: string;
  key?: string;
}

export interface IStoreResponse extends IResponse {
  data: IStoreTable[]
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
