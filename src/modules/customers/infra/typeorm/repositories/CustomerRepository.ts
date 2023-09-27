import { getRepository, Repository } from 'typeorm';
import { Customer } from '../entities/Customer';
import {
  FindParams,
  ICustomerRepository,
} from '@modules/customers/domain/interfaces/ICustomerRepository';
import { ICustomer } from '@modules/customers/domain/interfaces/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/interfaces/ICreateCustomer';
import { ICustomerPagination } from '@modules/customers/domain/interfaces/ICustomerPagination';

export class CustomerRepository implements ICustomerRepository {
  constructor(
    private ormRepo: Repository<Customer> = getRepository(Customer),
  ) {}

  public async create({ username, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepo.create({ username, email });
    await this.save(customer);
    return customer;
  }

  public async save(customer: ICustomer): Promise<Customer> {
    await this.ormRepo.save(customer);
    return customer;
  }

  public async findAll({
    page,
    skip,
    take,
  }: FindParams): Promise<ICustomerPagination> {
    const [customers, count] = await this.ormRepo
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };
  }

  public async findByUsername(username: string): Promise<Customer | undefined> {
    return await this.ormRepo.findOne({ where: { username } });
  }

  public async findById(customerId: string): Promise<Customer | undefined> {
    return await this.ormRepo.findOne({ where: { customer_id: customerId } });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.ormRepo.findOne({ where: { email } });
  }
}
