import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import { IRoleResponse, IRoleTable } from '@/pages/types/roleManagement';
import * as roleManagementService from '@/services/roleManagement';
import { getRoleListForTable } from '@/utils/roleManagementUtils';
import { STATUS_CODE } from '@/pages/constants';

export interface IRoleManagement {
  [key: string]: any;
}

export interface IRoleManagementModeType {
  namespace: 'roleManagement';
  state: IRoleManagement;
  effects: {
    getRoleManagementListEffect: Effect;
  };
}

export interface IRoleManagementState {
  roleList: IRoleTable[];
}

const partnerModel: IRoleManagementModeType = {
  namespace: 'roleManagement',
  state: {
    roleList: []
  },
  effects: {
    *getRoleManagementListEffect({ params },{ put, call }) {
      const res: IRoleResponse = yield call(roleManagementService.getRoleManagementListApi, params);
      if(_.isEmpty(res)){
        return;
      }
      return getRoleListForTable(res.data);
      yield put({
        type: 'setRoleListReducer',
        roleList: getRoleListForTable(res.data)
      });
    },
  },
};

export default partnerModel;
