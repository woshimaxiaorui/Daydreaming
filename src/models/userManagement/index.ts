import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import * as userManagementService from '@/services/userManagement';
import { IUserResponse, IUserTable } from '@/pages/types/UserManagement';
import { getUserListForTable } from '@/utils/userManagementUtils';

export interface IUserManagement {
  [key: string]: any;
}

export interface IUserManagementModelType {
  namespace: 'userManagement';
  state: IUserManagementState;
  effects: {
    getUserManagementListEffect: Effect;
  };
  reducers: {
    setUserListReducer: Reducer<IUserManagement>;
  };
}

export interface IUserManagementState {
  userList: IUserTable[];
  dataCount: number;
  pageCount: number;
}

const partnerModel: IUserManagementModelType = {
  namespace: 'userManagement',
  state: {
    userList: [],
    dataCount: 0,
    pageCount: 0,
  },
  effects: {
    *getUserManagementListEffect({ params }, { put , call }) {
      const res: IUserResponse = yield call(userManagementService.queryUserManagementListApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      yield put({
        type: 'setUserListReducer',
        userList: getUserListForTable(res.data),
        dataCount: Number(res.dataCount),
        pageCount: Number(res.pageCount)
      });
    }
  },
  reducers: {
    setUserListReducer: (state, { userList, dataCount, pageCount }) => {
      return { ...state, userList, dataCount, pageCount };
    }
  }
};

export default partnerModel;
