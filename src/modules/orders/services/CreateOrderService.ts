import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Order } from '../typeorm/entities/Order';
import { OrderRepository } from '../typeorm/repositories/OrderRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { ShowCustomerService } from '@modules/customers/services/ShowCustomerService';

interface IProduct {
  productId: string;
  quantity: number;
}

interface IOrderRequest {
  customerId: string;
  products: IProduct[];
}

export class CreateOrderService {
  public async execute({
    customerId,
    products,
  }: IOrderRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const showCustomer = new ShowCustomerService();
    const productRepository = getCustomRepository(ProductRepository);
    const customer = await showCustomer.execute({ customerId });

    const productsFound = await productRepository.findAllById(products);

    if (!productsFound.length) {
      throw new AppError('The selected products do not exist');
    }

    const productsFoundIds = productsFound.map((product) => product.product_id);
    const productsThatDoNotExist = products.filter(
      (prod) => !productsFoundIds.includes(prod.productId),
    );

    if (productsThatDoNotExist.length) {
      throw new AppError(
        `Could not found a product with the id: ${productsThatDoNotExist[0].productId}`,
      );
    }

    const productsWithInvalidQuantity = products.filter((incomingProduct) => {
      const [inStockProduct] = productsFound.filter(
        (inDbProduct) => inDbProduct.product_id === incomingProduct.productId,
      );

      return inStockProduct.quantity < incomingProduct.quantity;
    });

    if (productsWithInvalidQuantity.length) {
      throw new AppError(
        'Some products do not have available quantity in stock',
      );
    }

    const productsWithPrice = products.map((product) => ({
      product_id: product.productId,
      quantity: product.quantity,
      price: productsFound.filter(
        (inStockProduct) => inStockProduct.product_id === product.productId,
      )[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer,
      products: productsWithPrice,
    });

    const { order_products: orderProducts } = order;

    const productsWithUpdatedQuantity = orderProducts.map((orderProduct) => ({
      product_id: orderProduct.product_id,
      quantity:
        productsFound.find(
          (product) => product.product_id === orderProduct.product_id,
        )!.quantity - orderProduct.quantity,
    }));

    await productRepository.save(productsWithUpdatedQuantity);

    return order;
  }
}
