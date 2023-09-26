import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Order } from '../infra/typeorm/entities/Order';
import { OrderRepository } from '../infra/typeorm/repositories/OrderRepository';

interface IOrderRequest {
  orderId: string;
}

export class ShowOrderService {
  public async execute({ orderId }: IOrderRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}
