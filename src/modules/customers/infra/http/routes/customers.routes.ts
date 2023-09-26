import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { CustomerController } from '../controllers/CustomerController';
import { AuthValidator } from '@shared/infra/http/middlewares/AuthValidator';

function setupCustomerRouter(): Router {
  const router = Router();
  const customerController = new CustomerController();
  const auth = new AuthValidator();

  router.use(auth.validate);
  router.get('/', customerController.index);
  router.get(
    '/:customerId',
    celebrate({
      [Segments.PARAMS]: {
        customerId: Joi.string().uuid().required(),
      },
    }),
    customerController.show,
  );
  router.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        email: Joi.string().required(),
      },
    }),
    customerController.create,
  );
  router.put(
    '/:customerId',
    celebrate({
      [Segments.PARAMS]: {
        customerId: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        username: Joi.string().required(),
        email: Joi.string().required(),
      },
    }),
    customerController.update,
  );
  router.delete(
    '/:customerId',
    celebrate({
      [Segments.PARAMS]: {
        customerId: Joi.string().uuid().required(),
      },
    }),
    customerController.delete,
  );

  return router;
}

export const customersRouter = setupCustomerRouter();
