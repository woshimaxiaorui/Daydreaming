import request from '@/utils/request';
import { IAddPlayerResponse, ISearchPlayer, IPlayerResponse } from '@/pages/types/playerManagement';


export async function queryPlayerManagementListApi(params: ISearchPlayer): Promise<IPlayerResponse>{
  return request.get('/app/user/get-player-list', {
    params
  });
}

export async function addPlayerManagementApi(params: IAddPlayerResponse) {
  return request.post('/app/user/add-player', {
    data: params
  });
}

export async function editPlayerManagementApi(params: IAddPlayerResponse) {
  return request.post('/app/user/edit-player', {
    data: params
  });
}

export async function accountRechargeApi(params: IPlayerResponse) {
  return request.post('/app/user/account-recharge', {
    data: params
  });
}
