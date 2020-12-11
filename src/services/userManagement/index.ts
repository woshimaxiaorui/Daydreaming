import request from '@/utils/request';
import { ISearchUser, IUserResponse } from '@/pages/types/userManagement';

export async function queryUserManagementListApi(params: ISearchUser): Promise<IUserResponse>{
  return request.get('/service/user/get-user-list', {
    params
  });
}
