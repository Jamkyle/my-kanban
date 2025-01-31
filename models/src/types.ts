import { z } from 'zod';
import { schemas } from '../';

export type TodoResponseItem = z.infer<typeof schemas.TodoResponseItemSchema>;
export type KanbanItemStatus = z.infer<typeof schemas.KanbanItemStatusSchema>;
export type KanbanItem = z.infer<typeof schemas.KanbanItemSchema>;

export type KanbanColumn = z.infer<typeof schemas.KanbanColumnSchema>;

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
