import request from '@/utils/request';
import { IAddStoreResponse, ISearchStore, IStoreResponse } from '@/pages/types/storeManagement';


export async function queryStoreManagementListApi(params: ISearchStore): Promise<IStoreResponse>{
  return request.get('/app/user/get-store-list', {
    params
  });
}

export async function addStoreManagementApi(params: IAddStoreResponse) {
  return request.post('/app/user/add-store', {
    data: params
  });
}

export async function editStoreManagementApi(params: IAddStoreResponse) {
  return request.post('/app/user/edit-store', {
    data: params
  });
}

