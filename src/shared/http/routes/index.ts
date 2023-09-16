import { Router } from 'express';
import { usersRouter } from '@modules/users/routes/users.routes';
import { productsRouter } from '@modules/products/routes/products.routes';
import { sessionsRouter } from '@modules/users/routes/sessions.routes';
import { passwordsRouter } from '@modules/users/routes/passwords.routes';
import { usersProfilesRouter } from '@modules/users/routes/profiles.routes';
import { customersRouter } from '@modules/customers/routes/customers.routes';
import { ordersRouter } from '@modules/orders/routes/orders.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/sessions', sessionsRouter);
router.use('/products', productsRouter);
router.use('/passwords', passwordsRouter);
router.use('/customers', customersRouter);
router.use('/profile', usersProfilesRouter);

export default router;
