import { IProduct } from './IProduct';

export interface IUpdateStockProduct {
  product_id: string;
  quantity: number;
}

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findAllById(products: IProduct[]): Promise<IProduct[]>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(updatedProducts: IUpdateStockProduct[]): Promise<void>;
}
