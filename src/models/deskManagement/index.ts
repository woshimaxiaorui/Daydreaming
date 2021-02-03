import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import { IAddDeskResponse, IDeskResponse, IDeskTable } from '@/pages/types/deskManagement';
import * as deskManagementService from '@/services/deskManagement';
import { getDeskListForTable } from '@/utils/deskManagementUtils';
import { STATUS_CODE } from '@/pages/constants';

export interface IDeskManagement {
  [key: string]: any;
}

export interface IDeskManagementModeType {
  namespace: 'deskManagement';
  state: IDeskManagementState;
  effects: {
    getDeskManagementListEffect: Effect;
    addDeskManagementEffect: Effect;
    editDeskManagementEffect: Effect;
    getOrderManagementDeskListEffect: Effect;
  };
  reducers: {
    setDeskListReducer: Reducer<IDeskManagement>;
    setDeskOrderListReducer: Reducer<IDeskManagement>;
  };
}

export interface IDeskManagementState {
  deskList: IDeskTable[];
  deskOrderList: IDeskTable[];
  dataCount: number;
  pageCount: number;
}

const partnerModel: IDeskManagementModeType = {
  namespace: 'deskManagement',
  state: {
    deskList: [],
    deskOrderList: [],
    dataCount: 0,
    pageCount: 0,
  },
  effects: {
    *getDeskManagementListEffect({ params },{ put, call }) {
      const res: IDeskResponse = yield call(deskManagementService.queryDeskManagementListApi, params);
      if(_.isEmpty(res)){
        return;
      }
      yield put({
        type: 'setDeskListReducer',
        deskList: getDeskListForTable(res.data),
        dataCount: Number(res.dataCount),
        pageCount: Number(res.pageCount)
      });
    },
    *addDeskManagementEffect({ params }, { put, call }) {
      const addRes: IAddDeskResponse = yield call(deskManagementService.addDeskManagementApi, params);
      if(_.isEmpty(addRes)){
        return;
      }
      if(addRes.code == STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getDeskManagementListEffect'
        });
        return true;
      }
    },
    *editDeskManagementEffect({ params }, { put, call }) {
      const editRes: IAddDeskResponse = yield call(deskManagementService.editDeskManagementApi, params);
      if(_.isEmpty(editRes)){
        return;
      }
      if(editRes.code == STATUS_CODE.SUCCESS){
        yield put({
          type: 'getDeskManagementListEffect'
        });
        return true;
      }
    },
    *getOrderManagementDeskListEffect({ params },{ put, call }) {
      const res: IDeskResponse = yield call(deskManagementService.queryOrderManagementDeskListApi, params);
      if(_.isEmpty(res)){
        return;
      }
      yield put({
        type: 'setDeskOrderListReducer',
        deskOrderList: getDeskListForTable(res.data)
      });
    },
  },
  reducers: {
    setDeskListReducer: (state, { deskList, dataCount, pageCount }) => {
      return { ...state, deskList, dataCount, pageCount };
    },
    setDeskOrderListReducer: (state, { deskOrderList }) => {
      return { ...state, deskOrderList };
    },
  }
};

export default partnerModel;
