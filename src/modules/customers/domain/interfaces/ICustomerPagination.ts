import { ICustomer } from './ICustomer';

export interface ICustomerPagination {
  per_page: number;
  total: number;
  current_page: number;
  data: ICustomer[];
}
