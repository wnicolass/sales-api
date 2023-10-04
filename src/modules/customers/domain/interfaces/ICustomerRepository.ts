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
  findByEmail(email: string): Promise<ICustomer | null>;
  findByUsername(username: string): Promise<ICustomer | null>;
  findById(customerId: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
