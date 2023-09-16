import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { AuthValidator } from '@shared/http/middlewares/AuthValidator';
import { OrderController } from '../controllers/OrderController';

function setupOrdersRouter(): Router {
  const router = Router();
  const orderController = new OrderController();
  const auth = new AuthValidator();

  router.use(auth.validate);
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
