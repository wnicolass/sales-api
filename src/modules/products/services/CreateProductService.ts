import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IProduct } from '../domain/interfaces/IProduct';
import { IProductRepository } from '../domain/interfaces/IProductRepository';
import { RedisCacheSingleton } from '@shared/cache/RedisCache';
import { ICreateProductRequest } from '../domain/interfaces/ICreateProductRequest';

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductRepository') private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProductRequest): Promise<IProduct> {
    const productAlreadyExists =
      !!(await this.productRepository.findByName(name));

    if (productAlreadyExists) {
      throw new AppError(`Product with name "${name}", already exists`);
    }

    const redisCache = RedisCacheSingleton.client;
    const newProduct = await this.productRepository.create({
      name,
      price,
      quantity,
    });
    await redisCache.invalidate('sales-api:products');
    await this.productRepository.save(newProduct);

    return newProduct;
  }
}
