import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { ShowCustomerService } from './ShowCustomerService';

interface ICustomerRequest {
  customerId: string;
}

export class DeleteCustomerService {
  public async execute({ customerId }: ICustomerRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const showCustomerService = new ShowCustomerService();
    const customer = await showCustomerService.execute({ customerId });

    await customerRepository.remove(customer);

    return;
  }
}
