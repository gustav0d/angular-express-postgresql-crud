import type { NextFunction, Request, Response } from 'express';
import { AppError } from './appError.ts';
import { HttpStatusCode } from './protocols.ts';
import { ZodError } from 'zod';
import { formatValidationErrors } from './formatValidationErrors.ts';

const serverErrorCatcher = (
  err: Error,
  _: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      message: err.message,
      fieldErrors: err.fieldErrors,
    });
  } else if (err instanceof ZodError) {
    response.status(HttpStatusCode.BAD_REQUEST).json({
      message: 'Validation error',
      fieldErrors: formatValidationErrors(err),
    });
  } else {
    response.status(HttpStatusCode.SERVER_ERROR).json({
      error: 'Internal Server Error',
      message: err.message || 'An unexpected error occurred',
    });
  }
};

export { serverErrorCatcher };
