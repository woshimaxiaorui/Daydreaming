import request from '@/utils/request'
import { IAddOrderResponse, IOrderResponse } from '@/pages/types/orderManagement';


export async function queryOrderManagementListApi(params: []): Promise<IOrderResponse>{
  return request.get('/app/order/get-order-list',{
    params
  });
}

export async function addOrderManagementApi(params: IAddOrderResponse) {
  return request.post('/app/order/add-order',{
    data: params
  });
}

export async function editOrderManagementApi(params: IAddOrderResponse) {
  return request.post('/app/order/edit-order',{
    data: params
  });
}


export async function settlementOrderManagementApi(params: IAddOrderResponse) {
  return request.post('/app/order/set-order-settlement',{
    data: params
  });
}
