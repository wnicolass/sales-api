import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserController } from '../controllers/UserController';
import { AuthValidator } from '../../../shared/http/middlewares/AuthValidator';

function setupUserRoutes(): Router {
  const router = Router();
  const userController = new UserController();
  const auth = new AuthValidator();

  router.get('/', auth.validate, userController.index);
  router.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    userController.create,
  );

  return router;
}

export const usersRouter = setupUserRoutes();
