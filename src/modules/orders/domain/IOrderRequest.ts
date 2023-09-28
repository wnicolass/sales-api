import { IProduct } from '@modules/products/domain/IProduct';

export interface ICreateOrderRequest {
  customerId: string;
  products: IProduct[];
}
