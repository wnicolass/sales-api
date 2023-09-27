import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/interfaces/ICustomerRepository';
import { ICustomerPagination } from '../domain/interfaces/ICustomerPagination';

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
  }: SearchParams): Promise<ICustomerPagination> {
    const queryObject = {
      take: limit,
      skip: (+page - 1) * limit,
      page,
    };
    return await this.repository.findAll({ ...queryObject });
  }
}
