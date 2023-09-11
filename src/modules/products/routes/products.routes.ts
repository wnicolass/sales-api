import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ProductController } from '../controllers/ProductController';

function setupProductsRouter(): Router {
  const router = Router();
  const productController = new ProductController();

  router.get('/', productController.index);
  router.get(
    '/:productId',
    celebrate({
      [Segments.PARAMS]: {
        productId: Joi.string().uuid().required(),
      },
    }),
    productController.show,
  );
  router.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    }),
    productController.create,
  );
  router.put(
    '/:productId',
    celebrate({
      [Segments.PARAMS]: {
        productId: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    }),
    productController.update,
  );
  router.delete(
    '/:productId',
    celebrate({
      [Segments.PARAMS]: {
        productId: Joi.string().uuid().required(),
      },
    }),
    productController.delete,
  );

  return router;
}

export const productsRouter = setupProductsRouter();
