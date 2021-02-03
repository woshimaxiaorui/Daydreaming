import request from '@/utils/request';
import { IAccountResponse, ISearchAccount } from '@/pages/types/accountStatistics';

export async function queryAccountStatisticsListApi(params: ISearchAccount): Promise<IAccountResponse>{
  return request.get('/app/statistics/get-account-list',{
    params
  });
}

export async function queryAccountStatisticsDayListApi(params: ISearchAccount) {
  return request.get('/app/statistics/get-account-statistics-day-list',{
    params
  })
}
