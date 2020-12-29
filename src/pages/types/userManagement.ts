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
  remark: string;
  accountBalance: number;
  voucherBalance: number;
  id: string;
  key: string;
}

export interface IUserResponse extends IResponse {
  data: IUserTable[]
}

export interface ISearchUser {
  currentPage: number;
  pageRecords: number;
  storeId?: string;
  name?: string;
  phoneNumber?: string;
}
