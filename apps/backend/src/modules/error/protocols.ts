export interface HttpResponse<T> {
  statusCode: HttpStatusCodeType;
  body: T;
}

export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

export type HttpStatusCodeType = (typeof HttpStatusCode)[keyof typeof HttpStatusCode]
