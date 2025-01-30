import { Route } from '../types';

export const helloWorld: Route<string> = ({ response }) => {
  response.body = 'Hello World';
};
