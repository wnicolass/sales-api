import { Router } from 'express';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { ordersRouter } from '@modules/orders/infra/http/routes/orders.routes';
import { productsRouter } from '@modules/products/infra/http/routes/products.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { passwordsRouter } from '@modules/users/infra/http/routes/passwords.routes';
import { customersRouter } from '@modules/customers/infra/http/routes/customers.routes';
import { usersProfilesRouter } from '@modules/users/infra/http/routes/profiles.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/sessions', sessionsRouter);
router.use('/products', productsRouter);
router.use('/passwords', passwordsRouter);
router.use('/customers', customersRouter);
router.use('/profile', usersProfilesRouter);

export default router;
