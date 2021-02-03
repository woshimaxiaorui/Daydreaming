import { IResponse } from '@/pages/types/public';

export interface ISystemUserTable {
  userName: string;
  password: string;
  realName: string;
}

export interface IUserTable {
  role: string;
  storeId: string;
  nickname: string;
  sex: string;
  phone: string;
  birthday: string;
  remark: string;
  accountBalance: number;
  voucherBalance: number;
  killerIntegral: string;
  killerRanking: number;
  killerTitle: string;
  detectiveIntegral: string;
  detectiveRanking: number;
  detectiveTitle: string;
  peopleIntegral: string;
  peopleRanking: number;
  peopleTitle: string;
  totalIntegral: string;
  totalRanking: number;
  totalTitle: string;
  activeIntegral: string;
  id: string;
  key: string;
}

export interface IUserResponse extends IResponse {
  data: IUserTable[];
  dataCount: number;
  pageCount: number;
}

export interface ISearchUser {
  currentPage: number;
  pageRecords: number;
  storeId?: string;
  name?: string;
  phoneNumber?: string;
}
