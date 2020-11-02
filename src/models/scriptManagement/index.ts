import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import { IAddScriptResponse, IScriptResponse, IScriptTable } from '@/pages/types/scriptManagement';
import * as scriptManagementService from '@/services/scriptManagement';
import { getScriptListForTable } from '@/utils/scriptManagementUtils';
import { STATUS_CODE } from '@/pages/constants';

export interface IScriptManagement {
  [key: string]: any;
}

export interface IScriptManagementModeType {
  namespace: 'scriptManagement';
  state: IScriptManagement;
  effects: {
    getScriptManagementListEffect: Effect;
    addScriptManagementEffect: Effect;
    editScriptManagementEffect: Effect;
  };
  reducers: {
    setScriptListReducer: Reducer<IScriptManagement>;
  };
}

export interface IScriptManagementState {
  scriptList: IScriptTable[];
}

const partnerModel: IScriptManagementModeType = {
  namespace: 'scriptManagement',
  state: {
    scriptList: []
  },
  effects: {
    *getScriptManagementListEffect({ params },{ put, call }) {
      const res: IScriptResponse = yield call(scriptManagementService.queryScriptManagementListApi, params);
      if(_.isEmpty(res)){
        return;
      }
      yield put({
        type: 'setScriptListReducer',
        scriptList: getScriptListForTable(res.data)
      });
    },
    *addScriptManagementEffect({ params }, { put, call }) {
      const addRes: IAddScriptResponse = yield call(scriptManagementService.addScriptManagementApi, params);
      if(_.isEmpty(addRes)){
        return;
      }
      if(addRes.code == STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getScriptManagementListEffect'
        });
        return true;
      }
    },
    *editScriptManagementEffect({ params }, { put, call }) {
      const editRes: IAddScriptResponse = yield call(scriptManagementService.editScriptManagementApi, params);
      if(_.isEmpty(editRes)){
        return;
      }
      if(editRes.code == STATUS_CODE.SUCCESS){
        yield put({
          type: 'getScriptManagementListEffect'
        });
        return true;
      }
    }
  },
  reducers: {
    setScriptListReducer: (state, { scriptList }) => {
      return { ...state, scriptList };
    }
  }
};

export default partnerModel;
