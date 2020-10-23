import { IPlayerTable } from '@/pages/types/playerManagement';
import _ from 'lodash';

export const getPlayerListForTable = (list: IPlayerTable[]) => {
  return _.chain(list).map(item => ({
    ...item,
    key: item.id
  })).value();
};
