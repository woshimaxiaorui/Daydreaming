import { IResponse } from '@/pages/types/public';
import { IScriptTable } from '@/pages/types/scriptManagement';
import { IDeskTable } from '@/pages/types/deskManagement';
import { IUserTable } from '@/pages/types/userManagement';
import { IOrderDetailTable } from '@/pages/types/orderDetailManagement';

export interface IOrderTable {
  orderNo: string;
  scriptId: number;
  scriptInfo: IScriptTable;
  deskId: string;
  deskInfo: IDeskTable;
  hostId: string;
  hostInfo: IUserTable;
  receivableMoney?: number;
  realMoney: number;
  orderOperatorId: string;
  orderOperatorInfo: IUserTable;
  orderTime: string;
  settlementTime: string;
  status: string;
  statusDescription: string;
  remark: string;
  id?: string;
  key?: string;
  detailList?: IOrderDetailTable[];
}

export interface IOrderResponse extends IResponse {
  data: IOrderTable[];
}

export interface IAddOrderResponse extends IResponse {
  data: [];
}

export interface ISettlementOrderResponse extends IResponse {
  data: [];
}
