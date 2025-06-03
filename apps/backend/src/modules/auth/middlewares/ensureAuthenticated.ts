import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../../config.ts';
import { User, type UserAttributes } from '../userModel.ts';
import { errorHandler } from '../../error/utils/errorResponse.ts';

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
    errorHandler(response, {
      errorMessage: 'No token provided',
      statusCode: 401,
    });
  }

  const decoded = jwt.verify(token ?? '', config.JWT_SECRET) as {
    userId?: string;
  };

  const userExists = await User.findByPk(decoded?.userId);

  if (!userExists) {
    errorHandler(response, {
      statusCode: 401,
      errorMessage: 'Invalid token',
    });
  }

  request.user = userExists?.dataValues as Required<UserAttributes>;

  return next();
}
