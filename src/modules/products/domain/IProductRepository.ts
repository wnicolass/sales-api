import { IProduct } from './IProduct';
import { IPagination } from '@shared/interfaces/IPagination';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';

export interface IUpdateStockProduct {
  product_id: string;
  quantity: number;
}

export interface IProductRepository {
  findAll({
    page,
    skip,
    take,
  }: IPaginationParams): Promise<IPagination<IProduct>>;
  findByName(name: string): Promise<IProduct | undefined>;
  findAllById(products: IProduct[]): Promise<IProduct[]>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(updatedProducts: IUpdateStockProduct[]): Promise<void>;
}
