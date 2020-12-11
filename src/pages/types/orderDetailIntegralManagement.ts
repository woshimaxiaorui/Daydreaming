import { IOrderDetailTable } from '@/pages/types/orderDetailManagement';
import { IRoleTable } from '@/pages/types/roleManagement';

export interface IOrderDetailIntegralTable {
  orderDetailId?: string;
  orderDetailInfo?: IOrderDetailTable;
  roleId?: string;
  roleInfo?: IRoleTable;
  integral?: number;
  id?: string;
  key?: string;
}
