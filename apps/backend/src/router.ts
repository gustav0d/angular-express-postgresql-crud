import { Router } from 'express';
import { authRouter } from './modules/auth/authRoutes.ts';
import { HttpStatusCode } from './modules/error/protocols.ts';
import { AppError } from './modules/error/appError.ts';

const router = Router();

router.get('/', (_, response) => {
  response.json({
    message: 'Welcome to the Task Management API',
  });
});

router.use('/auth', authRouter);

router.use(() => {
  throw new AppError('Not Found', HttpStatusCode.NOT_FOUND);
});

export { router };
