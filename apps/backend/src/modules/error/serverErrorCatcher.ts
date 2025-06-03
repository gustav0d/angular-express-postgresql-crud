import type { NextFunction, Request, Response } from 'express';
import { errorHandler } from './utils/errorResponse.ts';

const serverErrorCatcher = (
  err: Error,
  _: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof Error) {
    errorHandler(response, {
      errorTitle: err.name,
      errorMessage: err.message,
      statusCode: 400,
    });

    return next();
  }

  errorHandler(response, {
    errorTitle: 'Internal Server Error',
    errorMessage: 'An unexpected error occurred.',
    statusCode: 500,
  });
  return next();
};

export { serverErrorCatcher };
