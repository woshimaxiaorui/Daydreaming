import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import { IAddOrderResponse, IOrderResponse, ISettlementOrderResponse, IOrderTable } from '@/pages/types/orderManagement';
import * as orderManagementService from '@/services/orderManagement';
import { getOrderListForTable } from '@/utils/orderManagementUtils';
import { STATUS_CODE } from '@/pages/constants';
import { IUserResponse } from '@/pages/types/userManagement';
import * as userManagementService from '@/services/userManagement';
import { getUserListForTable } from '@/utils/userManagementUtils';

export interface IOrderManagement {
  [key: string]: any;
}

export interface IOrderManagementModeType {
  namespace: 'orderManagement';
  state: IOrderManagementState;
  effects: {
    getOrderManagementListEffect: Effect;
    addOrderManagementEffect: Effect;
    editOrderManagementEffect: Effect;
    settlementOrderManagementEffect: Effect;
  };
  reducers: {
    setOrderListReducer: Reducer<IOrderManagement>;
  };
}

export interface IOrderManagementState {
  orderList: IOrderTable[];
}

const partnerModel: IOrderManagementModeType = {
  namespace: 'orderManagement',
  state: {
    orderList: []
  },
  effects: {
    *getOrderManagementListEffect({ params },{ put, call }) {
      const res: IOrderResponse = yield call(orderManagementService.queryOrderManagementListApi, params);
      if(_.isEmpty(res)){
        return;
      }
      yield put({
        type: 'setOrderListReducer',
        orderList: getOrderListForTable(res.data)
      });
    },
    *addOrderManagementEffect({ params }, { put, call }) {
      const addRes: IAddOrderResponse = yield call(orderManagementService.addOrderManagementApi, params);
      if(_.isEmpty(addRes)){
        return;
      }
      if(addRes.code == STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getOrderManagementListEffect'
        });
        yield put({
          type: 'deskManagement/getOrderManagementDeskListEffect'
        });
        return true;
      }
    },
    *editOrderManagementEffect({ params }, { put, call }) {
      const editRes: IAddOrderResponse = yield call(orderManagementService.editOrderManagementApi, params);
      if(_.isEmpty(editRes)){
        return;
      }
      if(editRes.code == STATUS_CODE.SUCCESS){
        yield put({
          type: 'getOrderManagementListEffect'
        });
        yield put({
          type: 'deskManagement/getOrderManagementDeskListEffect'
        });
        return true;
      }
    },
    *settlementOrderManagementEffect({ params }, { put, call }) {
      const addRes: ISettlementOrderResponse = yield call(orderManagementService.settlementOrderManagementApi, params);
      if(_.isEmpty(addRes)){
        return;
      }
      if(addRes.code == STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getOrderManagementListEffect'
        });
        yield put({
          type: 'deskManagement/getOrderManagementDeskListEffect'
        });
        return true;
      }
    },
  },
  reducers: {
    setOrderListReducer: (state, { orderList }) => {
      return { ...state, orderList };
    }
  }
};

export default partnerModel;
