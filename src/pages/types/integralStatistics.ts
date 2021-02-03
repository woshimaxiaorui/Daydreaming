import { IResponse } from '@/pages/types/public';
import { IUserTable } from '@/pages/types/userManagement';

export interface IUserIntegralRankTable {
  userId: string;
  userInfo: IUserTable;
  sumIntegral: number;
}

export interface IUserIntegralRankResponse extends IResponse {
  data: IUserIntegralRankTable[];
}
