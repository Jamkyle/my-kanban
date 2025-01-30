import { type KanbanColumn } from '@models/todos';
import KanbanItem from './KanbanItem';
import { useDroppable } from '@dnd-kit/core';
import { CirclePlus } from 'lucide-react';
import { useKanban } from '../../hooks/useKanban';
import AddItemScreen from './ModalAddItem';
import AddTaskButton from './AddTaskButton';
import { Dialog } from 'radix-ui';
import { useState } from 'react';

export default function KanbanColumn({ title, code, items }: KanbanColumn) {
  const { addItem } = useKanban();
  const [isOpen, setIsOpen] = useState(false);
  const { setNodeRef } = useDroppable({
    id: code,
    data: {
      status: code,
    },
  });
  return (
    <div ref={setNodeRef} className="rounded-md max-h-[600px] lg:min-w-[400px]">
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <div className="rounded-md mb-2 text-2xl font-bold border-1 tracking-tight text-gray-900 dark:text-white flex items-center gap-6 justify-center p-3">
          <h3 className="flex-1 text-center">{title}</h3>
          <AddTaskButton customIcon={<CirclePlus />} />
        </div>
        <div className="flex flex-col gap-1 h-full overflow-y-auto pb-1 z-0">
          {items?.length ? (
            items.map((it, index) => (
              <KanbanItem key={index + it.id} item={it} />
            ))
          ) : (
            <span>No Items</span>
          )}

          <AddTaskButton />
          <AddItemScreen
            onAddTask={(title, description) => {
              addItem(title, description, code);
              setIsOpen(false);
            }}
          />
        </div>
      </Dialog.Root>
    </div>
  );
}
