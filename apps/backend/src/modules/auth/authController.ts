import type { Request, Response } from 'express';
import { registerUserService } from './services/registerService.ts';
import { loginUserService } from './services/loginService.ts';

export async function createUserController(
  request: Request,
  response: Response,
) {
  const { name, email, password } = request.body;

  const user = await registerUserService({ name, email, password });

  response.status(201).json({
    message: 'User created successfully',
    user,
  });
}

export async function loginController(request: Request, response: Response) {
  const { email, password } = request.body;

  const result = await loginUserService({ email, password });

  response.status(200).json({
    message: 'Login successful',
    user: result.user,
    token: result.token,
  });
}
