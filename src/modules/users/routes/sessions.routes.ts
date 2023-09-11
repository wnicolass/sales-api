import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { SessionController } from '../controllers/SessionController';

function setupSessionRoutes(): Router {
  const router = Router();
  const sessionController = new SessionController();

  router.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    sessionController.create,
  );

  return router;
}

export const sessionsRouter = setupSessionRoutes();
