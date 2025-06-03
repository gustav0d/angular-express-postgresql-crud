import type { Request, Response } from 'express';
import { registerUserService } from './services/registerService.ts';
import { loginUserService } from './services/loginService.ts';
import { HttpStatusCode } from '../error/protocols.ts';

export async function createUserController(
  request: Request,
  response: Response,
) {
  const { name, email, password } = request.body;

  const user = await registerUserService({ name, email, password });

  response.status(HttpStatusCode.CREATED).json({
    message: 'User created successfully',
    user,
  });
}

export async function loginController(request: Request, response: Response) {
  const { email, password } = request.body;

  const result = await loginUserService({ email, password });

  response.status(HttpStatusCode.OK).json({
    message: 'Login successful',
    user: result.user,
    token: result.token,
  });
}
