import { IUserTable } from '@/pages/types/userManagement';
import { IPromotionsTable } from '@/pages/types/promotionsManagement';
import { IOrderTable } from '@/pages/types/orderManagement';
import { IResponse } from '@/pages/types/public';

export interface IAccountTable {
  userId?: string;
  userInfo?: IUserTable;
  changeMoney: number;
  changeTime: string;
  remarkIncrease: string;
  remarkReduce: string;
  changeType: number;
  promotionsId?: string;
  promotionsInfo?: IPromotionsTable;
  orderId?: string;
  orderInfo?: IOrderTable;
  id?: string;
  key?: string;
}

export interface IAccountResponse extends IResponse {
  data: IAccountTable[]
}

export interface ISearchAccount {
  currentPage: number;
  pageRecords: number;
  startDate?: string;
  endDate?: string;
  userId?: string;
}

export interface IAccountStatisticsTable {
  days: string;
  totalBalance: number;
  accountBalance: number;
  voucherBalance: number;
}

export interface IAccountStatisticsResponse extends IResponse {
  data: IAccountStatisticsTable[];
}
