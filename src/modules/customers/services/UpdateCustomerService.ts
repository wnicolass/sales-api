import { getCustomRepository } from 'typeorm';
import { update } from '@shared/typeorm/helpers/update';
import { AppError } from '@shared/errors/AppError';
import { Customer } from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface ICustomerRequest {
  customerId: string;
  username: string;
  email: string;
}

export class UpdateProfileService {
  public async execute({
    customerId,
    username,
    email,
  }: ICustomerRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerByNewEmail = await customerRepository.findByEmail(email);
    const currentCustomerEmail = customerByNewEmail?.email === customer.email;
    if (customerByNewEmail && !currentCustomerEmail) {
      throw new AppError('Email is already in use');
    }

    update(customer, { username, email });
    await customerRepository.save(customer);

    return customer;
  }
}
