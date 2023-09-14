import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { AuthValidator } from '../../../shared/http/middlewares/AuthValidator';
import { ProfileController } from '../controllers/ProfileController';

function setupUserProfileRoutes(): Router {
  const router = Router();
  const auth = new AuthValidator();
  const profileController = new ProfileController();

  router.use(auth.validate);
  router.get('/', profileController.show);
  router.put(
    '/',
    celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        oldPassword: Joi.string(),
        password: Joi.string().optional(),
        password_confirmation: Joi.string()
          .valid(Joi.ref('password'))
          .when('password', {
            is: Joi.exist(),
            then: Joi.required(),
          }),
      },
    }),
    profileController.update,
  );

  return router;
}

export const usersProfilesRouter = setupUserProfileRoutes();
