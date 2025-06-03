import { Router } from 'express';
import { notFound } from './modules/error/notFound.ts';

const router = Router();

router.get('/', (_, response) => {
  response.json({
    message: 'Welcome to the Task Management API',
  });
});

router.use(notFound);

export { router };
