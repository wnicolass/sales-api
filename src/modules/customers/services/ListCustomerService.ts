import { getCustomRepository } from 'typeorm';
import { Customer } from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

export class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository);
    return await customerRepository.find();
  }
}
