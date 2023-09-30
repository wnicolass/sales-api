import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IProduct } from '../domain/interfaces/IProduct';
import { IProductRequest } from '../domain/interfaces/IFindProductRequest';
import { IProductRepository } from '../domain/interfaces/IProductRepository';

@injectable()
export class ShowProductService {
  constructor(
    @inject('ProductRepository') private productRepository: IProductRepository,
  ) {}

  public async execute({ productId }: IProductRequest): Promise<IProduct> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
