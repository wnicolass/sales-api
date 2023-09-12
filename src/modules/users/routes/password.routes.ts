import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';

function setupPasswordRoutes(): Router {
  const router = Router();
  const forgotPasswordController = new ForgotPasswordController();

  router.post(
    '/forgot',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    }),
    forgotPasswordController.create,
  );

  return router;
}

export const passwordsRouter = setupPasswordRoutes();
