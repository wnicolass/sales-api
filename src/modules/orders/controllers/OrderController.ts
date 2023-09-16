import { Request, Response } from 'express';
import { ShowOrderService } from '../services/ShowOrderService';
import { CreateOrderService } from '../services/CreateOrderService';

export class ProductController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { orderId } = request.params;
    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ orderId });

    return response.status(200).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;
    const createOrder = new CreateOrderService();
    const newOrder = await createOrder.execute({ customerId, products });

    return response.status(201).json(newOrder);
  }
}
