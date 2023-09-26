import { Request, Response } from 'express';
import { ShowProductService } from '../../../services/ShowProductService';
import { ListProductsService } from '../../../services/ListProductService';
import { CreateProductService } from '../../../services/CreateProductService';
import { UpdateProductService } from '../../../services/UpdateProductService';
import { DeleteProductService } from '../../../services/DeleteProductService';

export class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductsService();
    const products = await listProducts.execute();

    return response.status(200).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ productId });

    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();
    const newProduct = await createProduct.execute({ name, price, quantity });

    return response.status(201).json(newProduct);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { productId } = request.params;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      productId,
      name,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ productId });

    return response.status(200).json([]);
  }
}
