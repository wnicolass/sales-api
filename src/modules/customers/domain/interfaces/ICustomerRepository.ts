import { ICustomer } from './ICustomer';
import { IPagination } from '@shared/interfaces/IPagination';
import { ICreateCustomer } from './ICreateCustomer';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';

export interface ICustomerRepository {
  findAll({
    page,
    skip,
    take,
  }: IPaginationParams): Promise<IPagination<ICustomer>>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findByUsername(username: string): Promise<ICustomer | undefined>;
  findById(customerId: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
}
