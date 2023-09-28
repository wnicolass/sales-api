import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { IProduct } from '@modules/products/domain/IProduct';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({
      where: {
        name,
      },
    });
  }

  public async findAllById(products: IProduct[]): Promise<Product[]> {
    const productsIds = products.map((product) => product.product_id);
    const existingProducts = await this.find({
      where: {
        product_id: In(productsIds),
      },
    });

    return existingProducts;
  }
}
