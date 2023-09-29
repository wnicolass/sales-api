import { In, Repository, getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { IProduct } from '@modules/products/domain/IProduct';
import { IPagination } from '@shared/interfaces/IPagination';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';
import {
  IProductRepository,
  IUpdateStockProduct,
} from '@modules/products/domain/IProductRepository';

export class ProductRepository implements IProductRepository {
  constructor(private ormRepo: Repository<Product> = getRepository(Product)) {}

  public async findAll({
    page,
    skip,
    take,
  }: IPaginationParams): Promise<IPagination<IProduct>> {
    const [products, count] = await this.ormRepo
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return await this.ormRepo.findOne({
      where: {
        name,
      },
    });
  }

  public async findAllById(products: IProduct[]): Promise<Product[]> {
    const productsIds = products.map((product) => product.product_id);
    const existingProducts = await this.ormRepo.find({
      where: {
        product_id: In(productsIds),
      },
    });

    return existingProducts;
  }

  public async save(product: IProduct): Promise<Product> {
    return await this.ormRepo.save(product);
  }

  public async updateStock(
    updatedProducts: IUpdateStockProduct[],
  ): Promise<void> {
    await this.ormRepo.save(updatedProducts);
  }
}
