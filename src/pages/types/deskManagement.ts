import { IResponse } from '@/pages/types/public';
import { IOrderTable } from '@/pages/types/orderManagement';
import { IStoreTable } from '@/pages/types/storeManagement';

export interface IDeskTable {
  title: string;
  storeId: string;
  storeInfo: IStoreTable;
  // storeName: string;
  orderInfo: IOrderTable;
  isEnabled: boolean;
  id?: string;
  key?: string;
}

export interface IDeskResponse extends IResponse {
  data: IDeskTable[];
}

export interface IAddDeskResponse extends IResponse {
  data: [];
}
