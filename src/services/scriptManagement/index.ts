import request from '@/utils/request'
import { IAddScriptResponse, IScriptResponse, ISearchScript } from '@/pages/types/scriptManagement';


export async function queryScriptManagementListApi(params: ISearchScript): Promise<IScriptResponse>{
  return request.get('/service/user/get-script-list',{
    params
  });
}

export async function addScriptManagementApi(params: IAddScriptResponse) {
  return request.post('/service/user/add-script',{
    data: params
  });
}

export async function editScriptManagementApi(params: IAddScriptResponse) {
  return request.post('/service/user/edit-script',{
    data: params
  });
}
