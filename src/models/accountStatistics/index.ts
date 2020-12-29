import _ from 'lodash';
import { Effect } from '@/models/connect';
import {
  IAccountResponse,
  IAccountStatisticsResponse,
  IAccountStatisticsTable,
  IAccountTable,
} from '@/pages/types/accountStatistics';
import * as accountStatisticsService from '@/services/accountStatistics';
import { getAccountListForTable, getAccountStatisticsListForTable } from '@/utils/accountStatisticsUtils';
import { Reducer } from 'redux';

export interface IAccountStatisticsState {
  accountList: IAccountTable[];
  accountStatisticsDayList: IAccountStatisticsTable[];
}

export interface IAccountStatistics {
  [key: string]: any;
}

export interface IAccountStatisticsModeType {
  namespace: 'accountStatistics';
  state: IAccountStatisticsState;
  effects: {
    getAccountStatisticsListEffect: Effect;
    getAccountStatisticsDayListEffect: Effect;
  };
  reducers: {
    setAccountListReducer: Reducer<IAccountStatistics>;
    setAccountStatisticsDayListReducer: Reducer<IAccountStatistics>;
  }
}

const partnerModel: IAccountStatisticsModeType = {
  namespace: 'accountStatistics',
  state: {
    accountList: [],
    accountStatisticsDayList: []
  },
  effects: {
    *getAccountStatisticsListEffect({params},{ call, put }) {
      const res: IAccountResponse = yield call(accountStatisticsService.queryAccountStatisticsListApi,params);
      if(_.isEmpty(res)) {
        return;
      }
      yield put({
        type: 'setAccountListReducer',
        accountList: getAccountListForTable(res.data)
      });
      // return getAccountListForTable(res.data);
    },
    *getAccountStatisticsDayListEffect({params},{ call, put }) {
      const res: IAccountStatisticsResponse = yield call(accountStatisticsService.queryAccountStatisticsDayListApi,params);
      if(_.isEmpty(res)) {
        return;
      }
      yield put({
        type: 'setAccountStatisticsDayListReducer',
        accountStatisticsDayList: getAccountStatisticsListForTable(res.data)
      });
      // return res.data;
    }
  },
  reducers: {
    setAccountListReducer: (state, { accountList }) => {
      return { ...state, accountList };
    },
    setAccountStatisticsDayListReducer: (state, { accountStatisticsDayList }) => {
      return { ...state, accountStatisticsDayList };
    },
  }
}

export default partnerModel;
