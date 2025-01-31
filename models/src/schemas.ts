import { z } from 'zod';

export const TodoResponseItemSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const TodosArraySchema = z.array(TodoResponseItemSchema);

export const KanbanItemStatusSchema = z.enum(['todo', 'in_progress', 'done']);

export const KanbanItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  cost: z.number(),
  status: KanbanItemStatusSchema,
});

export const KanbanColumnSchema = z.object({
  title: z.string(),
  code: KanbanItemStatusSchema,
  items: z.array(KanbanItemSchema).optional(),
});
