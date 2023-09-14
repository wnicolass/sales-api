import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';
import { ShowCustomerService } from './ShowCustomerService';

interface ICustomerRequest {
  customerId: string;
}

export class DeleteCustomerService {
  public async execute({ customerId }: ICustomerRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const showProductService = new ShowCustomerService();
    const customer = await showProductService.execute({ customerId });

    await customerRepository.remove(customer);

    return;
  }
}
