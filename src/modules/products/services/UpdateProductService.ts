import { inject, injectable } from 'tsyringe';
import { update } from '@shared/infra/typeorm/helpers/update';
import { IProduct } from '../domain/interfaces/IProduct';
import { AppError } from '@shared/errors/AppError';
import { IProductRepository } from '../domain/interfaces/IProductRepository';
import { RedisCacheSingleton } from '@shared/cache/RedisCache';
import { IUpdateProductRequest } from '../domain/interfaces/IUpdateProductRequest';

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductRepository') private productRepository: IProductRepository,
  ) {}

  public async execute({
    productId,
    name,
    price,
    quantity,
  }: IUpdateProductRequest): Promise<IProduct> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productAlreadyExists = await this.productRepository.findByName(name);
    const hasEqualName = product.name === name;

    if (productAlreadyExists && !hasEqualName) {
      throw new AppError(`Product with name ${name} already exists`);
    }

    const redisCache = RedisCacheSingleton.client;
    await redisCache.invalidate('sales-api:products');

    const updatedProduct = update(product, { name, price, quantity });
    await this.productRepository.save(updatedProduct);

    return product;
  }
}
