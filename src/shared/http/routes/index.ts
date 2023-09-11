import { Router } from 'express';
import { usersRouter } from '@modules/users/routes/users.routes';
import { productsRouter } from '@modules/products/routes/products.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);

export default router;
