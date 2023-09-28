import { ICustomer } from '@modules/customers/domain/interfaces/ICustomer';
import { ICreateOrderProduct } from './ICreateOrder';

export interface IOrder {
  order_id: string;
  customer: ICustomer;
  order_products: ICreateOrderProduct[];
  created_at: Date;
  updated_at: Date;
}
