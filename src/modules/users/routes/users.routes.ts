import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserController } from '../controllers/UserController';

function setupUserRoutes(): Router {
  const router = Router();
  const userController = new UserController();

  router.get('/', userController.index);
  router.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    userController.create,
  );

  return router;
}

export const usersRouter = setupUserRoutes();
