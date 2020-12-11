import { IOrderTable } from '@/pages/types/orderManagement';
import _ from 'lodash';

export const getOrderListForTable = (list: IOrderTable[]) => {
  return _.chain(list).map(item => ({
    ...item,
    key: item.id
  })).value();
};
