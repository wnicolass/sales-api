import { ICustomer } from '@modules/customers/domain/interfaces/ICustomer';
import { IProduct } from '@modules/products/domain/IProduct';

type ICreateOrderProduct = Pick<IProduct, 'product_id' | 'price' | 'quantity'>;

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProduct[];
}
