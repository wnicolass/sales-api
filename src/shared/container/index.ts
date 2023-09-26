import { container } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/interfaces/ICustomerRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
