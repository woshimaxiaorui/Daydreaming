import request from '@/utils/request';
import { IUserIntegralRankResponse } from '@/pages/types/integralStatistics';

export async function queryUserIntegralRankStatisticsListApi(params: any): Promise<IUserIntegralRankResponse> {
  return request.get('/app/statistics/get-user-integral-rank-statistics-list',{
    params
  })
}
