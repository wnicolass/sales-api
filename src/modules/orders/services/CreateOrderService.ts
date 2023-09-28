import { IOrder } from '../domain/IOrder';
import { AppError } from '@shared/errors/AppError';
import { IOrderRepository } from '../domain/IOrderRepository';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@modules/products/domain/IProductRepository';
import { ICustomerRepository } from '@modules/customers/domain/interfaces/ICustomerRepository';
import { ICreateOrderRequest } from '../domain/IOrderRequest';

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
    @inject('ProductRepository') private productRepository: IProductRepository,
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    customerId,
    products,
  }: ICreateOrderRequest): Promise<IOrder> {
    const customer = await this.customerRepository.findById(customerId);
    const productsFound = await this.productRepository.findAllById(products);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    if (!productsFound.length) {
      throw new AppError('The selected products do not exist');
    }

    const productsFoundIds = productsFound.map((product) => product.product_id);
    const productsThatDoNotExist = products.filter(
      (prod) => !productsFoundIds.includes(prod.product_id),
    );

    if (productsThatDoNotExist.length) {
      throw new AppError(
        `Could not found a product with the id: ${productsThatDoNotExist[0].product_id}`,
      );
    }

    const productsWithInvalidQuantity = products.filter((incomingProduct) => {
      const [inStockProduct] = productsFound.filter(
        (inDbProduct) => inDbProduct.product_id === incomingProduct.product_id,
      );

      return inStockProduct.quantity < incomingProduct.quantity;
    });

    if (productsWithInvalidQuantity.length) {
      throw new AppError(
        'Some products do not have available quantity in stock',
      );
    }

    const productsWithPrice = products.map((product) => ({
      product_id: product.product_id,
      quantity: product.quantity,
      price: productsFound.filter(
        (inStockProduct) => inStockProduct.product_id === product.product_id,
      )[0].price,
    }));

    const order = await this.orderRepository.create({
      customer,
      products: productsWithPrice,
    });

    const { order_products: orderProducts } = order;

    const productsWithUpdatedQuantity = orderProducts.map((orderProduct) => ({
      product_id: orderProduct.product.product_id,
      quantity:
        productsFound.find(
          (product) => product.product_id === orderProduct.product.product_id,
        )!.quantity - orderProduct.quantity,
    }));

    await this.productRepository.updateStock(productsWithUpdatedQuantity);

    return order;
  }
}
