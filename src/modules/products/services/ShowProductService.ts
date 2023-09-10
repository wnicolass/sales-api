import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { Product } from '../typeorm/entities/Product';
import { AppError } from '@shared/errors/AppError';

interface IProductRequest {
  productId: string;
}

export class ShowProductsService {
  public async execute({ productId }: IProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne({
      where: {
        product_id: productId,
      },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
