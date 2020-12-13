import _ from 'lodash';
import { Effect } from '@/models/connect';
import { STATUS_CODE } from '@/pages/constants';
import { ILoginCheckResponse, ILoginUserTable } from '@/pages/types/loginCheck';
import * as loginManagementService from '@/services/loginManagement';
import storage from '@/utils/storage';
import { Reducer } from 'redux';
import { IUserTable } from '@/pages/types/userManagement';

export interface IUserManagement {
  [key: string]: any;
}

export interface ILoginManagementModeType {
  namespace: 'loginManagement';
  state: IUserManagementState;
  effects: {
    loginCheckEffect: Effect;
  };
  reducers: {
    setLoginUserInfoReducer: Reducer<IUserTable>;
  };
}

export interface IUserManagementState {
  userInfo: IUserTable;
}

const partnerModel: ILoginManagementModeType = {
  namespace: 'loginManagement',
  state: {
    userInfo: {}
  },
  effects: {
    *loginCheckEffect({ params },{ put, call }) {
      const res: ILoginCheckResponse = yield call(loginManagementService.loginCheckManagementApi, params);
      if(_.isEmpty(res)){
        return;
      }
      if(res.code == STATUS_CODE.SUCCESS) {
        storage.saveUserToken(res.data.userToken);
        yield put({
          type: 'setLoginUserInfoReducer',
          userInfo: res.data
        });
        return true;
      }
      return false;
    },
  },
  reducers: {
    setLoginUserInfoReducer: (state, { userInfo }) => {
      return { ...state, userInfo };
    }
  }
};

export default partnerModel;
