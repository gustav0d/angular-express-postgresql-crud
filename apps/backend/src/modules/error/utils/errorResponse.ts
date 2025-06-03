import type { Response } from 'express';

type ErrorHandlerParams = {
  errorTitle?: string;
  errorMessage: string;
  statusCode?: number;
};

export const errorHandler = (
  response: Response,
  { errorTitle, errorMessage, statusCode = 400 }: ErrorHandlerParams,
) => {
  return response.status(statusCode).json({
    error: errorTitle,
    message: errorMessage,
  });
};
