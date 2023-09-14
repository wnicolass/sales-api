import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Customer } from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface ICustomerRequest {
  username: string;
  email: string;
}

export class CreateCustomerService {
  public async execute({
    username,
    email,
  }: ICustomerRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const emailAlreadyExists = !!(await customerRepository.findByEmail(email));

    if (emailAlreadyExists) {
      throw new AppError(`Email "${email}" already in use`);
    }

    const newCustomer = customerRepository.create({ username, email });
    await customerRepository.save(newCustomer);

    return newCustomer;
  }
}
