import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { OrderController } from '../controllers/OrderController';

function setupOrdersRouter(): Router {
  const router = Router();
  const orderController = new OrderController();

  router.get(
    '/:orderId',
    celebrate({
      [Segments.PARAMS]: {
        orderId: Joi.string().uuid().required(),
      },
    }),
    orderController.show,
  );
  router.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        customerId: Joi.string().required(),
        products: Joi.required(),
      },
    }),
    orderController.create,
  );

  return router;
}

export const ordersRouter = setupOrdersRouter();
