import { IOrderProduct } from '@modules/orders/domain/interfaces/IOrderProduct';

export interface IProduct {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  order_products?: IOrderProduct[];
  created_at: Date;
  updated_at: Date;
}
