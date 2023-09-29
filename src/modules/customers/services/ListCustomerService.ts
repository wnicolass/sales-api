import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/interfaces/ICustomer';
import { IPagination } from '@shared/interfaces/IPagination';
import { ICustomerRepository } from '../domain/interfaces/ICustomerRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export class ListCustomerService {
  constructor(
    @inject('CustomerRepository') private repository: ICustomerRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IPagination<ICustomer>> {
    const queryObject = {
      take: limit,
      skip: (+page - 1) * limit,
      page,
    };
    return await this.repository.findAll({ ...queryObject });
  }
}
