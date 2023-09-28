import { ICustomer } from '@modules/customers/domain/interfaces/ICustomer';
import { IOrderProduct } from './IOrderProduct';

export interface IOrder {
  order_id: string;
  customer: ICustomer;
  order_products: IOrderProduct[];
  created_at: Date;
  updated_at: Date;
}
