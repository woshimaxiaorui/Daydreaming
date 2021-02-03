
export interface IPagination {
  current: number;
  pageSize: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: IShowQuickJumper;
}
export interface IShowQuickJumper {
  (total: number): string;
}
