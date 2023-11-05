import { describe, it, vi, expect } from 'vitest';
import { createServer } from '../../../utils/createServer';
import * as TodoService from '../todo.service';
import { nanoid } from 'nanoid';

describe('POST "/api/todos" route', () => {
  it('should call the createTodo service', async () => {
    // mock response
    const todo = {
      _id: 'mock id',
      title: 'mock title',
      shortId: `todo_${nanoid()}`,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Set function Test.
    const createTodoSpy = vi.spyOn(TodoService, 'createTodo');
    expect(createTodoSpy.getMockName()).toEqual('createTodo');
    createTodoSpy.mockResolvedValue(todo);

    const server = await createServer();
    await server.ready();

    const payload = {
      title: 'A test todo',
    };

    const response = await server.inject({
      method: 'POST',
      url: '/api/todos',
      payload,
    });

    expect(response.json()).toEqual(todo);
    expect(createTodoSpy).toHaveBeenCalledWith(payload);
  });
});
