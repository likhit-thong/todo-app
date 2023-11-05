import { Static, Type } from '@sinclair/typebox';

const todoRequest = Type.Object({
  title: Type.String({
    default: 'A default todo',
  }),
});

const todoReponse = Type.Object({
  _id: Type.String(),
  title: Type.String(),
  shortId: Type.String(),
  completed: Type.Boolean(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export const createTodoSchema = {
  tags: ['todo'],
  description: 'Create a todo resouce',
  body: todoRequest,
  response: {
    201: todoReponse,
  },
};

export type CreateTodoBody = Static<typeof createTodoSchema.body>;
