import { IDeskTable } from '@/pages/types/deskManagement';
import _ from 'lodash';

export const getDeskListForTable = (list: IDeskTable[]) => {
  return _.chain(list).map(item => ({
    ...item,
    key: item.id
  })).value();
};
