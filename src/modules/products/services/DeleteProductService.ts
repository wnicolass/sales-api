import { inject, injectable } from 'tsyringe';
import { AppError } from 'dist/shared/errors/AppError';
import { IProductRequest } from '../domain/interfaces/IFindProductRequest';
import { IProductRepository } from '../domain/interfaces/IProductRepository';
import { RedisCacheSingleton } from '@shared/cache/RedisCache';

@injectable()
export class DeleteProductService {
  constructor(
    @inject('ProductRepository') private productRepository: IProductRepository,
  ) {}

  public async execute({ productId }: IProductRequest): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const redisCache = RedisCacheSingleton.client;
    await redisCache.invalidate('sales-api:products');
    await this.productRepository.remove(product);

    return;
  }
}
