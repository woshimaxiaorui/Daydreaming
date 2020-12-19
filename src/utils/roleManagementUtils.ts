import { IRoleTable } from '@/pages/types/roleManagement';
import _ from 'lodash';

export const getRoleListForTable = (list: IRoleTable[]) => {
  return _.chain(list).map(item => ({
    ...item,
    key: item.id
  })).value();
};
