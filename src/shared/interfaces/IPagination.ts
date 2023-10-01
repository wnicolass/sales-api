export interface IPagination<T> {
  per_page: number;
  total: number;
  current_page: number;
  data: T[];
}
