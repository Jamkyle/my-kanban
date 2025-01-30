import { Middleware } from 'koa';

export type Route<ResponseType> = Middleware<
  Record<string, never>,
  Record<string, never>,
  ResponseType
>;
