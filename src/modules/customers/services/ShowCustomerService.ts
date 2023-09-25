import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';

interface ICustomerRequest {
  customerId: string;
}

export class ShowCustomerService {
  public async execute({ customerId }: ICustomerRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}
