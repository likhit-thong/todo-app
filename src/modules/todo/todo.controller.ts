import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../utils/logger';
import { createTodo } from './todo.service';
import { CreateTodoBody } from './todo.schema';

export async function createTodoHandler(
  request: FastifyRequest<{
    Body: CreateTodoBody;
  }>,
  reply: FastifyReply,
) {
  try {
    const body = request.body;
    const todo = await createTodo(body);
    return reply.code(201).send(todo);
  } catch (e) {
    logger.error(e, 'createTodoHandler: error creating todo');
    return reply.code(409).send({ message: 'Error creating todo' });
  }
}
