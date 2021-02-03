import request from '@/utils/request'
import { IAddDeskResponse, IDeskResponse } from '@/pages/types/deskManagement';


export async function queryDeskManagementListApi(params: []): Promise<IDeskResponse>{
  return request.get('/app/desk/get-desk-list',{
    params
  });
}

export async function queryOrderManagementDeskListApi(params: []): Promise<IDeskResponse>{
  return request.get('/app/desk/get-desk-order-list',{
    params
  });
}

export async function addDeskManagementApi(params: IAddDeskResponse) {
  return request.post('/app/desk/add-desk',{
    data: params
  });
}

export async function editDeskManagementApi(params: IAddDeskResponse) {
  return request.post('/app/desk/edit-desk',{
    data: params
  });
}
