import _ from 'lodash';
import { Effect } from '@/models/connect';
import { STATUS_CODE } from '@/pages/constants';
import { ILoginCheckResponse, ILoginUserTable } from '@/pages/types/loginCheck';
import * as loginManagementService from '@/services/loginManagement';
import storage from '@/utils/storage';
import { Reducer } from 'redux';

export interface IUserManagement {
  [key: string]: any;
}

export interface ILoginManagementModeType {
  namespace: 'loginManagement';
  state: ILoginUserManagementState;
  effects: {
    loginCheckEffect: Effect;
  };
  reducers: {
    setLoginUserInfoReducer: Reducer<IUserManagement>;
  };
}

export interface ILoginUserManagementState {
  userInfo: ILoginUserTable;
}

const partnerModel: ILoginManagementModeType = {
  namespace: 'loginManagement',
  state: {
    userInfo: {} as ILoginUserTable
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
