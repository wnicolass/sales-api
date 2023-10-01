import { inject, injectable } from 'tsyringe';
import { update } from '@shared/infra/typeorm/helpers/update';
import { AppError } from '@shared/errors/AppError';
import { ICustomer } from '../domain/interfaces/ICustomer';
import { ICustomerRepository } from '../domain/interfaces/ICustomerRepository';
import { IUpdateCustomerRequest } from '../domain/interfaces/IUpdateCustomerRequest';

@injectable()
export class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    customerId,
    username,
    email,
  }: IUpdateCustomerRequest): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerByNewEmail = await this.customerRepository.findByEmail(email);
    const currentCustomerEmail = customerByNewEmail?.email === customer.email;
    if (customerByNewEmail && !currentCustomerEmail) {
      throw new AppError('Email is already in use');
    }

    update(customer, { username, email });
    await this.customerRepository.save(customer);

    return customer;
  }
}
