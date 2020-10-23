import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import * as playerManagementService from '@/services/playerManagement';
import { IAddPlayerResponse, IPlayerResponse, IPlayerTable } from '@/pages/types/PlayerManagement';
import { getPlayerListForTable } from '@/utils/playerManagementUtils';
import { STATUS_CODE } from '@/pages/constants';

export interface IPlayerManagement {
  [key: string]: any;
}

export interface IPlayerManagementModelType {
  namespace: 'playerManagement';
  state: IPlayerManagementState;
  effects: {
    getPlayerManagementListEffect: Effect;
    addPlayerManagementEffect: Effect;
    editPlayerManagementEffect: Effect;
  };
  reducers: {
    setPlayerListReducer: Reducer<IPlayerManagement>;
  };
}

export interface IPlayerManagementState {
  playerList: IPlayerTable[];
}

const partnerModel: IPlayerManagementModelType = {
  namespace: 'playerManagement',
  state: {
    playerList: []
  },
  effects: {
    *getPlayerManagementListEffect({ params }, { put , call }) {
      const res: IPlayerResponse = yield call(playerManagementService.queryPlayerManagementListApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      yield put({
        type: 'setPlayerListReducer',
        playerList: getPlayerListForTable(res.data)
      });
    },
    *addPlayerManagementEffect({params}, { call, put }) {
      const addRes: IAddPlayerResponse = yield call(playerManagementService.addPlayerManagementApi, params);
      if (_.isEmpty(addRes)) {
        return;
      }
      if (addRes.code === STATUS_CODE.SUCCESS ) {
        yield put({
          type: 'getPlayerManagementListEffect'
        });
        return { userNameExists: true, playerNameExists: true }
      }
      if (addRes.code === STATUS_CODE.CHECK_ERROR) {
        return {
          phoneExists: addRes.data.phoneExists
        }
      }
    },
    *editPlayerManagementEffect({params}, { call, put }) {
      const editRes: IAddPlayerResponse = yield call(playerManagementService.editPlayerManagementApi, params);
      if (_.isEmpty(editRes)) {
        return;
      }
      if (editRes.code === STATUS_CODE.SUCCESS ) {
        yield put({
          type: 'getPlayerManagementListEffect'
        });
        return { phoneExists: true }
      }
      if (editRes.code === STATUS_CODE.CHECK_ERROR) {
        return {
          phoneExists: editRes.data.phoneExists
        }
      }
    }
  },
  reducers: {
    setPlayerListReducer: (state, { playerList }) => {
      return { ...state, playerList };
    }
  }
};


export default partnerModel;
