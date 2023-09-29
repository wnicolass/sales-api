import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { Customer } from '../infra/typeorm/entities/Customer';
import { ICustomerRequest } from '../domain/interfaces/ICustomerRequest';
import { ICustomerRepository } from '../domain/interfaces/ICustomerRepository';

@injectable()
export class ShowCustomerService {
  constructor(
    @inject('CustomerRepository') private repository: ICustomerRepository,
  ) {}

  public async execute({ customerId }: ICustomerRequest): Promise<Customer> {
    const customer = await this.repository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}
