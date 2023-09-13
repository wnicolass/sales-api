import { Router } from 'express';
import { usersRouter } from '@modules/users/routes/users.routes';
import { productsRouter } from '@modules/products/routes/products.routes';
import { sessionsRouter } from '@modules/users/routes/sessions.routes';
import { passwordsRouter } from '@modules/users/routes/passwords.routes';
import { usersProfilesRouter } from '@modules/users/routes/profiles.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/products', productsRouter);
router.use('/passwords', passwordsRouter);
router.use('/profile', usersProfilesRouter);

export default router;
