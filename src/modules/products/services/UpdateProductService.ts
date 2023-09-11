import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { update } from '@shared/typeorm/helpers/update';
import { Product } from '../typeorm/entities/Product';
import { AppError } from '@shared/errors/AppError';
import { ShowProductService } from './ShowProductService';

interface IProductRequest {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async execute({
    productId,
    name,
    price,
    quantity,
  }: IProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ productId });
    const productAlreadyExists = await productRepository.findByName(name);
    const hasEqualName = product.name === name;

    if (productAlreadyExists && !hasEqualName) {
      throw new AppError(`Product with name ${name} already exists`);
    }

    const updatedProduct = update(product, { name, price, quantity });
    await productRepository.save(updatedProduct);

    return product;
  }
}
