import { IResponse } from '@/pages/types/public';
import { IUserTable } from '@/pages/types/userManagement';

export interface ILoginUserTable extends IUserTable{
  userToken: string;
}

export interface ILoginCheckResponse extends IResponse {
  data: ILoginUserTable;
}
