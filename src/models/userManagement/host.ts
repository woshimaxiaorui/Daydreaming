import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import * as userManagementService from '@/services/userManagement';
import { IUserResponse, IUserTable } from '@/pages/types/userManagement';
import { getUserListForTable } from '@/utils/userManagementUtils';

export interface IHostManagement {
  [key: string]: any;
}

export interface IHostManagementModelType {
  namespace: 'hostManagement';
  state: IHostManagementState;
  effects: {
    getHostManagementListEffect: Effect;
  };
  reducers: {
    setHostListReducer: Reducer<IHostManagement>;
  };
}

export interface IHostManagementState {
  hostList: IUserTable[];
  dataCount: number;
  pageCount: number;
}

const partnerModel: IHostManagementModelType = {
  namespace: 'hostManagement',
  state: {
    hostList: [],
    dataCount: 0,
    pageCount: 0,
  },
  effects: {
    *getHostManagementListEffect({ params }, { put , call }) {
      const res: IUserResponse = yield call(userManagementService.queryHostManagementListApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      yield put({
        type: 'setHostListReducer',
        hostList: getUserListForTable(res.data),
        dataCount: Number(res.dataCount),
        pageCount: Number(res.pageCount)
      });
    }
  },
  reducers: {
    setHostListReducer: (state, { hostList, dataCount, pageCount }) => {
      return { ...state, hostList, dataCount, pageCount };
    }
  }
};

export default partnerModel;
