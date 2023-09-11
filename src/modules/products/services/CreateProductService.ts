import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';

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

    const newProduct = productRepository.create({ name, price, quantity });
    await productRepository.save(newProduct);

    return newProduct;
  }
}