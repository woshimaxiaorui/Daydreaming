import { IRoleResponse } from '@/pages/types/roleManagement';
import request from '@/utils/request';


export async function getRoleManagementListApi(params: []): Promise<IRoleResponse>{
  return request.get('/service/user/get-role-list',{
    params
  });
}
