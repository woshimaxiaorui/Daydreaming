import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import * as StoreManagementService from '@/services/storeManagement';
import { IAddStoreResponse, IStoreResponse, IStoreTable } from '@/pages/types/storeManagement';
import { getStoreListForTable } from '@/utils/storeManagementUtils';
import { STATUS_CODE } from '@/pages/constants';

export interface IStoreManagement {
  [key: string]: any;
}

export interface IStoreManagementModelType {
  namespace: 'storeManagement';
  state: IStoreManagementState;
  effects: {
    getStoreManagementListEffect: Effect;
    addStoreManagementEffect: Effect;
    editStoreManagementEffect: Effect;
  };
  reducers: {
    setStoreListReducer: Reducer<IStoreManagement>;
  };
}

export interface IStoreManagementState {
  storeList: IStoreTable[];
}

const partnerModel: IStoreManagementModelType = {
  namespace: 'storeManagement',
  state: {
    storeList: []
  },
  effects: {
    *getStoreManagementListEffect({ params }, { put , call }) {
      const res: IStoreResponse = yield call(StoreManagementService.queryStoreManagementListApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      yield put({
        type: 'setStoreListReducer',
        storeList: getStoreListForTable(res.data)
      });
    },
    *addStoreManagementEffect({params}, { call, put }) {
      const addRes: IAddStoreResponse = yield call(StoreManagementService.addStoreManagementApi, params);
      if (_.isEmpty(addRes)) {
        return;
      }
      if (addRes.code === STATUS_CODE.SUCCESS ) {
        yield put({
          type: 'getStoreManagementListEffect'
        });
        return { userNameExists: true, storeNameExists: true }
      }
      if (addRes.code === STATUS_CODE.CHECK_ERROR) {
        return {
          userNameExists: addRes.data.userNameExists,
          storeNameExists: addRes.data.storeNameExists
        }
      }
    },
    *editStoreManagementEffect({params}, { call, put }) {
      const editRes: IAddStoreResponse = yield call(StoreManagementService.editStoreManagementApi, params);
      if (_.isEmpty(editRes)) {
        return;
      }
      if (editRes.code === STATUS_CODE.SUCCESS ) {
        yield put({
          type: 'getStoreManagementListEffect'
        });
        return { storeNameExists: true }
      }
      if (editRes.code === STATUS_CODE.CHECK_ERROR) {
        return {
          storeNameExists: editRes.data.storeNameExists
        }
      }
    }
    // *isLoginEffect({}, { put, call }) {
    //   const res = yield call(queryCatalogInfoAndStatusApi);
    //   if (_.isEmpty(res) || !checkStart(res.response.status.toString(), '2')) {
    //     yield put({
    //       type: 'setUserTypeReducer',
    //       userType: '',
    //       isLoggedIn: false
    //     });
    //     localStorage.setItem("userName", "");
    //     return;
    //   }
      // yield put({
      //   type: 'setStoreListReducer',
      //   storeList:
      // });
    // }
  },
  reducers: {
    setStoreListReducer: (state, { storeList }) => {
      return { ...state, storeList };
    }
  }
};


export default partnerModel;
