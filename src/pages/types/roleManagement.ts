import { IResponse } from '@/pages/types/public';

export interface IRoleTable {
  title: string;
  maxAddIntegral: number;
  id?: string;
  key?: string;
}

export interface IRoleResponse extends IResponse {
  data: IRoleTable[];
  dataCount: number;
  pageCount: number;
}
