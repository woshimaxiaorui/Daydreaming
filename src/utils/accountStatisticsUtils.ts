import { IAccountStatisticsTable, IAccountTable } from '@/pages/types/accountStatistics';
import _ from 'lodash';

export const getAccountListForTable = (list: IAccountTable[]) => {
  return _.chain(list).map(item => ({
    ...item,
    key: item.id
  })).value();
};

export const getAccountStatisticsListForTable = (list: IAccountStatisticsTable[]) => {
  return _.chain(list).map((item, key) => ({
    ...item,
    key
  })).value();
};
