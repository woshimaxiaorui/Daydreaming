import storage from '@/utils/storage';
import { ILoginUserTable } from '@/pages/types/loginCheck';
import * as loginManagementService from '@/services/loginManagement';
import { STATUS_CODE } from '@/pages/constants';

interface ILogin {
  isLogin: boolean;
  userInfo: ILoginUserTable;
}

export const useAuth = async (): Promise<ILogin> => {
  const params = {
    token: storage.getUserToken()
  }
  const res = await loginManagementService.loginTokenCheckManagementApi(params);
  if(res.code == STATUS_CODE.SUCCESS){
    return {
      isLogin: true,
      userInfo: res.data
    }
  }
  return {
    isLogin: false,
    userInfo: {} as ILoginUserTable
  }
};
