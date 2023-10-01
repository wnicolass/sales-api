import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ShowOrderService } from '../../../services/ShowOrderService';
import { ListOrderService } from '@modules/orders/services/ListOrderService';
import { CreateOrderService } from '../../../services/CreateOrderService';

export class OrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query;
    const listOrders = container.resolve(ListOrderService);
    const orders = await listOrders.execute({
      page: page ? +page : 1,
      limit: limit ? +limit : 15,
    });

    return response.status(200).json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { orderId } = request.params;
    const showOrder = container.resolve(ShowOrderService);
    const order = await showOrder.execute({ orderId });

    return response.status(200).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;
    const createOrder = container.resolve(CreateOrderService);
    const newOrder = await createOrder.execute({ customerId, products });

    return response.status(201).json(newOrder);
  }
}
