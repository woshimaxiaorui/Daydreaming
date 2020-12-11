import { IUserTable } from '@/pages/types/userManagement';
import { IOrderTable } from '@/pages/types/orderManagement';
import { IOrderDetailIntegralTable } from '@/pages/types/orderDetailIntegralManagement';

export interface IOrderDetailTable {
  orderId?: string;
  orderInfo?: IOrderTable;
  userId?: string;
  userInfo?: IUserTable;
  unitPrice?: number;
  isPay?: boolean;
  discount?: number;
  id?: string;
  key?: string;
  /// params
  tempId?: string;
  discountPrice?: number;
  orderDetailIntegralList?: IOrderDetailIntegralTable[];
}
