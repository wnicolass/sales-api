import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICustomerRequest } from '../domain/interfaces/ICustomerRequest';
import { ICustomerRepository } from '../domain/interfaces/ICustomerRepository';

@injectable()
export class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ customerId }: ICustomerRequest): Promise<void> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return await this.customerRepository.remove(customer);
  }
}
