import { Repository, getRepository } from 'typeorm';
import { Order } from '../entities/Order';
import { IOrder } from '@modules/orders/domain/interfaces/IOrder';
import { IPagination } from '@shared/interfaces/IPagination';
import { ICreateOrder } from '@modules/orders/domain/interfaces/ICreateOrder';
import { IOrderRepository } from '@modules/orders/domain/interfaces/IOrderRepository';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';

export class OrderRepository implements IOrderRepository {
  constructor(private ormRepo: Repository<Order> = getRepository(Order)) {}

  public async create({ customer, products }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepo.create({ customer, order_products: products });
    return await this.ormRepo.save(order);
  }

  public async findById(orderId: string): Promise<Order | undefined> {
    return await this.ormRepo.findOne({
      where: { order_id: orderId },
      relations: ['order_products', 'customer'],
    });
  }

  public async findAll({
    page,
    skip,
    take,
  }: IPaginationParams): Promise<IPagination<IOrder>> {
    const [orders, count] = await this.ormRepo
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };
  }
}
