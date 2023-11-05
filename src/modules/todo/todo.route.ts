import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createTodoHandler } from './todo.controller';
import { createTodoSchema } from './todo.schema';

export function todoRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  app.get('/', () => 'Hello');
  app.post(
    '/',
    {
      schema: createTodoSchema,
    },
    createTodoHandler,
  );
  done();
}
