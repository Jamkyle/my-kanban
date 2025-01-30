import { z } from 'zod';

export const TodoResponseItemSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const TodosArraySchema = z.array(TodoResponseItemSchema);

export type TodoResponseItem = z.infer<typeof TodoResponseItemSchema>;

export const KanbanItemStatusSchema = z.enum(['todo', 'in_progress', 'done']);
export type KanbanItemStatus = z.infer<typeof KanbanItemStatusSchema>;

export const KanbanItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  cost: z.number(),
  status: KanbanItemStatusSchema,
});
export type KanbanItem = z.infer<typeof KanbanItemSchema>;

export const KanbanColumnSchema = z.object({
  title: z.string(),
  code: KanbanItemStatusSchema,
  items: z.array(KanbanItemSchema).optional(),
});

export type KanbanColumn = z.infer<typeof KanbanColumnSchema>;

export type KanbanBoardProps = {
  columns: Record<KanbanItemStatus, KanbanItem[]>;
};

export type columnType = Record<
  KanbanItemStatus,
  { title: string; items: KanbanItem[] }
>;

export type KanbanContextType = {
  columns: columnType;
  moveItem: (itemId: number, newStatus: KanbanItemStatus) => void;
  addItem: (title: string, description: string, code: KanbanItemStatus) => void;
  deleteItem: (itemId: number) => void;
};
