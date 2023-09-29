import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/IOrder';
import { AppError } from '@shared/errors/AppError';
import { IOrderRepository } from '../domain/IOrderRepository';

interface IOrderRequest {
  orderId: string;
}

@injectable()
export class ShowOrderService {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
  ) {}

  public async execute({ orderId }: IOrderRequest): Promise<IOrder> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}
