import { EffectsCommandMap } from 'dva';
import { Action, AnyAction } from 'redux';
import { RouterTypes } from 'umi';
import { call } from 'redux-saga/effects';
import * as H from 'history';
import { IStoreManagementState } from '@/models/storeManagement';
import { IPlayerManagementState } from '@/models/playerManagement';
// import { IPartnerState } from '@/models/partner/partner-model';

export type Effect = (
  action: AnyAction,
  effects: Omit<EffectsCommandMap, 'call'> & { select: <T>(func: (state: ConnectState) => T) => T; call: typeof call }
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = Action, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
  };
}

interface IRoutingState {
  location: H.Location & { query: { [key: string]: any } };
}

export interface ConnectState {
  router: IRoutingState;
  loading: Loading;
  storeManagement: IStoreManagementState;
  playerManagement: IPlayerManagementState;
}

export interface Route {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T extends { [key: string]: any } = {}> extends Partial<RouterTypes<Route>> {
  dispatch?: Dispatch;
}

export default ConnectState;
