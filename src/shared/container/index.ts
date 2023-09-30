import { container } from 'tsyringe';
import { JWTAdapter } from '@modules/users/infra/adapters/JWTAdapter';
import { IJWTAdapter } from '@modules/users/domain/interfaces/IJWTAdapter';
import { BcryptAdapter } from '@modules/users/infra/adapters/BcryptAdater';
import { IBcryptAdapter } from '@modules/users/domain/interfaces/IBcryptAdapter';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { OrderRepository } from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { IUserRepository } from '@modules/users/domain/interfaces/IUserRepository';
import { IOrderRepository } from '@modules/orders/domain/interfaces/IOrderRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IProductRepository } from '@modules/products/domain/interfaces/IProductRepository';
import { ICustomerRepository } from '@modules/customers/domain/interfaces/ICustomerRepository';
import { UserTokenRepository } from 'dist/modules/users/typeorm/repositories/UserToken';
import { IUserTokenRepository } from '@modules/users/domain/interfaces/IUserTokenRepository';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);
container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
container.registerSingleton<IUserRepository>(
  'ProductRepository',
  UserRepository,
);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
container.registerSingleton<IJWTAdapter>('JWTAdapter', JWTAdapter);
container.registerSingleton<IBcryptAdapter>('BcryptAdapter', BcryptAdapter);
