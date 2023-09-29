import { IProduct } from '@modules/products/domain/interfaces/IProduct';

export interface ICreateOrderRequest {
  customerId: string;
  products: IProduct[];
}
