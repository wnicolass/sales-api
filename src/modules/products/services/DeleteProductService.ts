import { getCustomRepository } from 'typeorm';
import { RedisCacheSingleton } from '@shared/cache/RedisCache';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { ShowProductService } from './ShowProductService';

interface IProductRequest {
  productId: string;
}

export class DeleteProductService {
  public async execute({ productId }: IProductRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ productId });

    const redisCache = RedisCacheSingleton.client;
    await redisCache.invalidate('sales-api:products');
    await productRepository.remove(product);

    return;
  }
}
