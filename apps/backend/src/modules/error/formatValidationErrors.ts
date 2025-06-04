import type { ZodError } from 'zod';

export function formatValidationErrors(message: ZodError<any>) {
  return message.issues.map((error) => {
    return {
      field: error.path.join('.'),
      message: error.message,
    };
  });
}
