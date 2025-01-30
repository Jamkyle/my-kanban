import {
  columnType,
  KanbanContextType,
  KanbanItem,
  KanbanItemStatus,
} from '@models/todos';
import { createContext, useState, ReactNode, useEffect } from 'react';

export const KanbanContext = createContext<KanbanContextType | undefined>(
  undefined,
);

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<columnType>({
    todo: { title: 'To Do', items: [] },
    in_progress: { title: 'In Progress', items: [] },
    done: { title: 'Done', items: [] },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // setup axios and proxy for fetch from 'http://localhost:8080/api/todos'
        // temporary for test
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=20',
        );
        const data = await response.json();

        const newTasks: KanbanItem[] = data.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          cost: task.cost,
          status: 'todo',
        }));
        setColumns((prev) => {
          const existingIds = new Set(prev.todo.items.map((task) => task.id));
          const filteredTasks = newTasks.filter(
            (task) => !existingIds.has(task.id),
          );

          return {
            ...prev,
            todo: {
              ...prev.todo,
              items: [...prev.todo.items, ...filteredTasks],
            },
          };
        });
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const moveItem = (itemId: number, newStatus: KanbanItemStatus) => {
    setColumns((prev) => {
      let movedItem: KanbanItem | undefined;
      const updatedColumns = { ...prev };

      for (const status of Object.keys(updatedColumns) as KanbanItemStatus[]) {
        updatedColumns[status].items = updatedColumns[status].items.filter(
          (it) => {
            if (it.id === itemId) {
              movedItem = { ...it, status: newStatus };
              return false;
            }
            return true;
          },
        );
      }

      if (movedItem) {
        updatedColumns[newStatus].items = [
          ...updatedColumns[newStatus].items,
          movedItem,
        ];
      }

      return updatedColumns;
    });
  };

  const addItem = (
    title: string,
    description: string,
    code: KanbanItemStatus,
  ) => {
    const stCode = code || 'todo'
    const newItem: KanbanItem = {
      id: Date.now(),
      title,
      description: description,
      cost: 0,
      status: stCode,
    };
    setColumns((prev) => ({
      ...prev,
      [stCode]: { ...prev[stCode], items: [...prev[stCode].items, newItem] },
    }));
  };

  const deleteItem = (itemId: number) => {
    setColumns((prev) => {
      const updatedColumns = { ...prev };
      for (const status of Object.keys(updatedColumns) as KanbanItemStatus[]) {
        updatedColumns[status].items = updatedColumns[status].items.filter(
          (it) => it.id !== itemId,
        );
      }
      return updatedColumns;
    });
  };

  return (
    <KanbanContext.Provider value={{ columns, moveItem, addItem, deleteItem }}>
      {children}
    </KanbanContext.Provider>
  );
};
