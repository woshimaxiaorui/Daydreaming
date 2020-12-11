import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import * as userManagementService from '@/services/userManagement';
import { IUserResponse, IUserTable } from '@/pages/types/UserManagement';
import { getUserListForTable } from '@/utils/userManagementUtils';
import { STATUS_CODE } from '@/pages/constants';

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
}

const partnerModel: IUserManagementModelType = {
  namespace: 'userManagement',
  state: {
    userList: []
  },
  effects: {
    *getUserManagementListEffect({ params }, { put , call }) {
      const res: IUserResponse = yield call(userManagementService.queryUserManagementListApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      yield put({
        type: 'setUserListReducer',
        userList: getUserListForTable(res.data)
      });
    }
  },
  reducers: {
    setUserListReducer: (state, { userList }) => {
      return { ...state, userList };
    }
  }
};

export default partnerModel;
