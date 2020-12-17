import request from '@/utils/request'
import { ILoginCheckResponse } from '@/pages/types/loginCheck';


export async function loginCheckManagementApi(params: any): Promise<ILoginCheckResponse>{
  return request.post('/service/signin/login-check',{
    data: params
  });
}

export async function loginTokenCheckManagementApi(params: any): Promise<ILoginCheckResponse>{
  return request.post('/service/signin/login-token-check',{
    data: params
  });
}
