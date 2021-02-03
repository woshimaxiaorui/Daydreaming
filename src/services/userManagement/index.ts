import request from '@/utils/request';
import { ISearchUser, IUserResponse } from '@/pages/types/userManagement';

export async function queryUserManagementListApi(params: ISearchUser): Promise<IUserResponse>{
  return request.get('/app/user/get-user-list', {
    params
  });
}

export async function queryHostManagementListApi(params: ISearchUser): Promise<IUserResponse>{
  return request.get('/app/user/get-host-list', {
    params
  });
}
