import { Router } from 'express';
import { createUserController, loginController } from './authController.ts';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.ts';

const authRouter = Router();

authRouter.post('/register', createUserController);
authRouter.post('/login', loginController);

authRouter.get('/', ensureAuthenticated, (req, res) => {
  res.json({
    message: 'Welcome to the authenticated route',
    user: req.user,
  });
});

export { authRouter };
