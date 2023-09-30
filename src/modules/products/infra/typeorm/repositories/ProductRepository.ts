import { In, Repository, getRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { IProduct } from '@modules/products/domain/interfaces/IProduct';
import { IPagination } from '@shared/interfaces/IPagination';
import { IPaginationParams } from '@shared/interfaces/IPaginationParams';
import { ICreateProductRequest } from '@modules/products/domain/interfaces/ICreateProductRequest';
import {
  IProductRepository,
  IUpdateStockProduct,
} from '@modules/products/domain/interfaces/IProductRepository';

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

  public async findById(productId: string): Promise<IProduct | undefined> {
    return await this.ormRepo.findOne({ where: { product_id: productId } });
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

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductRequest): Promise<Product> {
    const product = this.ormRepo.create({ name, price, quantity });

    return product;
  }

  public async save(product: IProduct): Promise<Product> {
    return await this.ormRepo.save(product);
  }

  public async updateStock(
    updatedProducts: IUpdateStockProduct[],
  ): Promise<void> {
    await this.ormRepo.save(updatedProducts);
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepo.remove(product);
  }
}
