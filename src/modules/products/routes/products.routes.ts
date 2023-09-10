import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

function setupProductsRouter(): Router {
  const router = Router();
  const productController = new ProductController();

  router.get('/', productController.index);
  router.get('/:productId', productController.show);
  router.post('/', productController.create);
  router.put('/:productId', productController.update);
  router.delete('/:productId', productController.delete);

  return router;
}

export const productsRouter = setupProductsRouter();
