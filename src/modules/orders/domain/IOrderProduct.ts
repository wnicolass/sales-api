import { IOrder } from './IOrder';
import { IProduct } from '@modules/products/domain/IProduct';

export interface IOrderProduct {
  id: string;
  price: number;
  quantity: number;
  order: IOrder;
  product: IProduct;
  created_at: Date;
  updated_at: Date;
}
