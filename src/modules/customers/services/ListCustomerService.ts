import { getCustomRepository } from 'typeorm';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';

interface ICustomerPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: null | number;
  next_page: null | number;
  data: Customer[];
}

export class ListCustomerService {
  public async execute(): Promise<ICustomerPagination> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository.createQueryBuilder().paginate();
    return customers as ICustomerPagination;
  }
}
