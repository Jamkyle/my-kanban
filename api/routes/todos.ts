import axios from 'axios';
import { Context } from 'koa';
import { Route } from '../types';
import { TodosArraySchema } from '../../../models/src/todos';

export const todos: Route<string> = async ({ response }: Context) => {
  try {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/todos',
    );
    const validatedTodos = TodosArraySchema.safeParse(data);

    if (!validatedTodos.success) {
      console.error('Validation error:', validatedTodos.error.errors);
      response.status = 500;
      response.body = { error: 'Invalid data structure received from API' };
      return;
    }

    response.body = validatedTodos.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    response.status = 500;
    response.body = { error: 'Failed to fetch todos' };
  }
};
