import { IScriptTable } from '@/pages/types/scriptManagement';
import _ from 'lodash';

export const getScriptListForTable = (list: IScriptTable[]) => {
  return _.chain(list).map(item => ({
    ...item,
    key: item.id
  })).value();
};
