import { IOrderDetailTable } from '@/pages/types/orderDetailManagement';
import _ from 'lodash';

export const getOrderDetailListForTable = (list: IOrderDetailTable[]) => {
  return _.chain(list).map(item => ({
    ...item,
    discountPrice: Number(_.isUndefined(item.unitPrice) ? 0 : item.unitPrice) * Number(_.isUndefined(item.discount) ? 0 : item.discount),
    tempId: item.userId,
    key: item.id
  })).value();
};
