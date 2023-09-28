import { IPaginationParams } from '@shared/interfaces/IPaginationParams';
import { ICreateCustomer } from './ICreateCustomer';
import { ICustomer } from './ICustomer';
import { ICustomerPagination } from './ICustomerPagination';

export interface ICustomerRepository {
  findAll({
    page,
    skip,
    take,
  }: IPaginationParams): Promise<ICustomerPagination>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findByUsername(username: string): Promise<ICustomer | undefined>;
  findById(customerId: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
}
