import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../../config.ts';
import { User, type UserAttributes } from '../userModel.ts';
import { AppError } from '../../error/appError.ts';
import { HttpStatusCode } from '../../error/protocols.ts';

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new AppError('No token provided', HttpStatusCode.UNAUTHORIZED);
  }

  const decoded = jwt.verify(token ?? '', config.JWT_SECRET) as {
    userId?: string;
  };

  const userExists = await User.findByPk(decoded?.userId);

  if (!userExists) {
    throw new AppError('Invalid token', HttpStatusCode.UNAUTHORIZED);
  }
  
  request.user = userExists?.dataValues as Required<UserAttributes>;
  next();
}
