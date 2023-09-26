import multer from 'multer';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { multerConfig } from '@config/fileUpload';
import { AuthValidator } from '../../../../../shared/infra/http/middlewares/AuthValidator';
import { UserController } from '../controllers/UserController';
import { UserAvatarController } from '../controllers/UserAvatarController';

function setupUserRoutes(): Router {
  const router = Router();
  const userController = new UserController();
  const userAvatarController = new UserAvatarController();
  const auth = new AuthValidator();
  const upload = multer(multerConfig.multer);

  router.get('/', auth.validate, userController.index);
  router.patch(
    '/avatar',
    auth.validate,
    upload.single('avatar'),
    userAvatarController.update,
  );
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
