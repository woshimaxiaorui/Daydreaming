import _ from 'lodash';
import { Effect } from '@/models/connect';
import { getAccountListForTable } from '@/utils/accountStatisticsUtils';
import { Reducer } from 'redux';
import { IUserIntegralRankResponse, IUserIntegralRankTable } from '@/pages/types/integralStatistics';
import * as integralStatisticsService from '@/services/integralStatistics';

export interface IIntegralStatisticsState {
  userRankList: IUserIntegralRankTable[];
}

export interface IUserIntegralRankStatistics {
  [key: string]: any;
}

export interface IAccountStatisticsModeType {
  namespace: 'integralStatistics';
  state: IIntegralStatisticsState;
  effects: {
    getUserIntegralRankStatisticsListEffect: Effect;
  };
  reducers: {
    setUserIntegralRankListReducer: Reducer<IUserIntegralRankStatistics>;
  }
}

const partnerModel: IAccountStatisticsModeType = {
  namespace: 'integralStatistics',
  state: {
    userRankList: [],
  },
  effects: {
    *getUserIntegralRankStatisticsListEffect({params},{ call, put }) {
      const res: IUserIntegralRankResponse = yield call(integralStatisticsService.queryUserIntegralRankStatisticsListApi,params);
      if(_.isEmpty(res)) {
        return;
      }
      yield put({
        type: 'setUserIntegralRankListReducer',
        userRankList: res.data,
      });
    },
  },
  reducers: {
    setUserIntegralRankListReducer: (state, { userRankList }) => {
      return { ...state, userRankList };
    },
  }
}

export default partnerModel;
