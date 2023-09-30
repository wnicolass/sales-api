import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/interfaces/IProduct';
import { IPagination } from '@shared/interfaces/IPagination';
import { IProductRepository } from '../domain/interfaces/IProductRepository';
import { RedisCacheSingleton } from '@shared/cache/RedisCache';

interface ISearchParams {
  page: number;
  limit: number;
}

@injectable()
export class ListProductsService {
  constructor(
    @inject('ProductRepository') private productRepository: IProductRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: ISearchParams): Promise<IPagination<IProduct>> {
    const redisCache = RedisCacheSingleton.client;
    let products = await redisCache.recover<IProduct[]>('sales-api:products');
    const queryObject = {
      take: limit,
      skip: (+page - 1) * limit,
      page,
    };

    if (!products) {
      const queryResult = await this.productRepository.findAll({
        ...queryObject,
      });
      products = queryResult.data;
      await redisCache.save('sales-api:products', products);
    }

    return {
      per_page: limit,
      total: products.length,
      current_page: page,
      data: products,
    };
  }
}
