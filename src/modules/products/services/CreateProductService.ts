import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { AppError } from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { RedisCacheSingleton } from '@shared/cache/RedisCache';

interface IProductRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productAlreadyExists = !!(await productRepository.findByName(name));

    if (productAlreadyExists) {
      throw new AppError(`Product with name "${name}", already exists`);
    }

    const redisCache = RedisCacheSingleton.client;
    const newProduct = productRepository.create({ name, price, quantity });
    await redisCache.invalidate('sales-api:products');
    await productRepository.save(newProduct);

    return newProduct;
  }
}
