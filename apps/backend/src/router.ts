import { Router } from 'express';
import { notFound } from './modules/error/notFound.ts';
import { authRouter } from './modules/auth/authRoutes.ts';

const router = Router();

router.get('/', (_, response) => {
  response.json({
    message: 'Welcome to the Task Management API',
  });
});

router.use('/auth', authRouter);

router.use(notFound);

export { router };
