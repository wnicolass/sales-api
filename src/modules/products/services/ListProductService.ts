import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { Product } from '../typeorm/entities/Product';
import { RedisCache } from '@shared/cache/RedisCache';

export class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    let products = await redisCache.recover<Product[]>('sales-api:products');

    if (!products) {
      products = await productRepository.find();
      await redisCache.save('sales-api:products', products);
    }

    return products;
  }
}
