import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from '../entities/Product';

interface IFindProducts {
  productId: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({
      where: {
        name,
      },
    });
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map((product) => product.productId);
    const existingProducts = await this.find({
      where: {
        product_id: In(productsIds),
      },
    });

    return existingProducts;
  }
}
