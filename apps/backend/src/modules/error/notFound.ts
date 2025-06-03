import type { Request, Response } from 'express';
import { errorHandler } from './utils/errorResponse.ts';

export const notFound = (_: Request, response: Response) => {
  errorHandler(response, {
    errorTitle: 'Page not found',
    errorMessage: 'The requested resource could not be found.',
    statusCode: 404,
  });
};
