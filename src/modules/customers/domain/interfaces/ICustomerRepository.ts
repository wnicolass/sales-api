import { ICreateCustomer } from './ICreateCustomer';
import { ICustomer } from './ICustomer';

export interface ICustomerRepository {
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findByUsername(username: string): Promise<ICustomer | undefined>;
  findById(customerId: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
}
