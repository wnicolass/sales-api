import { ICreateCustomer } from './ICreateCustomer';
import { ICustomer } from './ICustomer';
import { ICustomerPagination } from './ICustomerPagination';

export interface FindParams {
  page: number;
  skip: number;
  take: number;
}
export interface ICustomerRepository {
  findAll({ page, skip, take }: FindParams): Promise<ICustomerPagination>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findByUsername(username: string): Promise<ICustomer | undefined>;
  findById(customerId: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
}
