import { container } from 'tsyringe';
import { OrderRepository } from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { IOrderRepository } from '@modules/orders/domain/IOrderRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { ICustomerRepository } from '@modules/customers/domain/interfaces/ICustomerRepository';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
