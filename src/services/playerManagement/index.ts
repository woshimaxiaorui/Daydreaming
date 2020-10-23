import request from '@/utils/request';
import { IAddPlayerResponse, ISearchPlayer, IPlayerResponse } from '@/pages/types/playerManagement';


export async function queryPlayerManagementListApi(params: ISearchPlayer): Promise<IPlayerResponse>{
  return request.get('/service/user/get-player-list', {
    params
  });
}

export async function addPlayerManagementApi(params: IAddPlayerResponse) {
  return request.post('/service/user/add-player', {
    data: params
  });
}

export async function editPlayerManagementApi(params: IAddPlayerResponse) {
  return request.post('/service/user/edit-Player', {
    data: params
  });
}
