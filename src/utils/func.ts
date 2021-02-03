import _ from 'lodash';
import { IPagination } from '@/pages/types/pagination';

export const getRandomuserParams = (params: any) => ({
  currentPage: _.isEmpty(params.pagination) ? 1 : params.pagination.current,
  pageRecords: _.isEmpty(params.pagination) ? 10 : params.pagination.pageSize,
  ...params
});

export const getPaginationParams = (params: any, pagination: IPagination, total?: number) => {
  return {
    formValues: params,
    pagination: {
      ...params.pagination,
      total,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: ( (total: number, range: any) => {
        return `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`;
      }),
    }
  };
}
