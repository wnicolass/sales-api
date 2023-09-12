import { Router } from 'express';
import { usersRouter } from '@modules/users/routes/users.routes';
import { productsRouter } from '@modules/products/routes/products.routes';
import { sessionsRouter } from '@modules/users/routes/sessions.routes';
import { passwordsRouter } from '@modules/users/routes/password.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/products', productsRouter);
router.use('/passwords', passwordsRouter);

export default router;
