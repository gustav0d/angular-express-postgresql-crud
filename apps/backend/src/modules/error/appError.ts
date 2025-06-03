import { ZodError, type typeToFlattenedError } from 'zod';
import { HttpStatusCode, type HttpStatusCodeType } from './protocols.ts';

type FieldErrorType = {
  field:string;
  message:string;
};

export class AppError {
  message: string | typeToFlattenedError<any>;
  fieldErrors?: FieldErrorType[];
  statusCode: HttpStatusCodeType;

  constructor(
    message: string | ZodError,
    statusCode: HttpStatusCodeType = HttpStatusCode.BAD_REQUEST,
  ) {
    this.statusCode = statusCode;
    
    if (message instanceof ZodError) {
      this.message = "Validation error, see 'fieldErrors' for details";
      this.fieldErrors = message.issues.map((error) => {
        return({
        field: error.path.join('.'),
        message: error.message
      })});      
    } else {
      this.message = message;
    }
  }
}
