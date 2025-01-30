import KanbanColumn from './KanbanColumn';
import KanbanItemComponent from './KanbanItem';
import { useKanban } from '../../hooks/useKanban';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { KanbanItemStatus, type KanbanItem } from '@models/todos';
import { useState } from 'react';

export default function KanbanBoard() {
  const { columns, moveItem } = useKanban();
  const [activeItem, setActiveItem] = useState<KanbanItem | null | undefined>(
    null,
  );
  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(active.data.current as KanbanItem);
  };
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.data.current?.status === over.data.current?.status)
      return;
    moveItem(active.id as number, over.id as KanbanItemStatus);
  };

  return (
    <div className="flex gap-4 flex-col">
      <h1>Kanban board</h1>
      <div className="flex w-full gap-3">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        >
          {Object.entries(columns).map(([status, obj], index) => (
            <KanbanColumn key={status + index} title={obj.title} code={status as KanbanItemStatus} items={obj.items} />
          ))}
          <DragOverlay>
            {activeItem ? <KanbanItemComponent item={activeItem} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
