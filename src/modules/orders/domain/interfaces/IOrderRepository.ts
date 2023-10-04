import { IOrder } from './IOrder';
import { IPagination } from '@shared/interfaces/IPagination';
import { ICreateOrder } from './ICreateOrder';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';

export interface IOrderRepository {
  findById(orderId: string): Promise<IOrder | null>;
  findAll({
    page,
    skip,
    take,
  }: IPaginationParams): Promise<IPagination<IOrder>>;
  create(data: ICreateOrder): Promise<IOrder>;
}
