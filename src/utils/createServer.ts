import fastify from 'fastify';
import { todoRoutes } from '../modules/todo/todo.route';

export async function createServer() {
  const app = fastify();

  app.register(todoRoutes, { prefix: '/api/todos' });
  return app;
}
