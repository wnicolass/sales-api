import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  return response.status(200).json({
    message: 'Sanity check',
  });
});

export default router;
