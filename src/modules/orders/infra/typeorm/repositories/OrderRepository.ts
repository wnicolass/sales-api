import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/Order';
import { Product } from '@modules/products/typeorm/entities/Product';
import { Customer } from '@modules/customers/typeorm/entities/Customer';

type IProduct = Pick<Product, 'product_id' | 'price' | 'quantity'>;

interface ICreateOrder {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  public async findById(orderId: string): Promise<Order | undefined> {
    return await this.findOne(orderId, {
      relations: ['order_products', 'customer'],
    });
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    return await this.save(order);
  }
}
