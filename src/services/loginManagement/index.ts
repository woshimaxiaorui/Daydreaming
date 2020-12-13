import request from '@/utils/request'
import { ILoginCheckResponse } from '@/pages/types/loginCheck';


export async function loginCheckManagementApi(params: []): Promise<ILoginCheckResponse>{
  return request.post('/service/signin/login-check',{
    data: params
  });
}
