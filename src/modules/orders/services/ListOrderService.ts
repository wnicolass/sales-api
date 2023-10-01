import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/interfaces/IOrder';
import { IPagination } from '@shared/interfaces/IPagination';
import { IOrderRepository } from '../domain/interfaces/IOrderRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export class ListOrderService {
  constructor(
    @inject('OrderRepository') private repository: IOrderRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IPagination<IOrder>> {
    const queryObject = {
      take: limit,
      skip: (+page - 1) * limit,
      page,
    };
    return await this.repository.findAll({ ...queryObject });
  }
}
