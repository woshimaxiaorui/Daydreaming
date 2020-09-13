import { IStoreTable } from '@/pages/types/storeManagement';
import _ from 'lodash';

export const getStoreListForTable = (list: IStoreTable[]) => {
  return _.chain(list).map(item => ({
    ...item,
    key: item.id,
    userName: `${item.userName} (${item.realName})`
  })).value();
};
