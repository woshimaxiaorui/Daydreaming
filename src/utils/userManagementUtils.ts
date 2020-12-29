import { IUserTable } from '@/pages/types/userManagement';
import _ from 'lodash';

export const getUserListForTable = (list: IUserTable[]) => {
  // return _.chain(list).map(item => ({
  //   ...item,
  //   key: item.id
  // })).filter((f: IUserTable) => Number(f.role) < 3).value();
  return _.chain(list).map(item => ({
    ...item,
    key: item.id
  })).value();
};
