import { useDraggable } from '@dnd-kit/core';
import { KanbanItemStatus, type KanbanItem } from '@models/todos';
import { useKanban } from '../../hooks/useKanban';
import DropMenu from '../common/DropMenu';
import { ChevronRight, Trash2 } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';

export default function KanbanItem({ item }: { item: KanbanItem }) {
  const { deleteItem, moveItem } = useKanban();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: {
      ...item,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-pointer flex flex-col border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 touch-none md:w-[300px] max-h-[200px] overflow-clip lg:w-[400px]"
    >
      <DropMenu>
        <DropdownMenu.Content
          className="cursor-pointer min-w-[220px] rounded-md bg-gray-700 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <DropdownMenu.Item className='p-1 hover:bg-gray-500'>Edit</DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="pl-1 flex flex-1 items-center justify-center border-gray-300 hover:bg-gray-500 border-b-1 py-1">
              Move to
              <div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                <ChevronRight />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="cursor-pointer min-w-[220px] rounded-md bg-gray-700 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22, _23, _24, _0.35),_0px_10px_20px_-15px_rgba(22, _23, _24, _0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade">
                {['todo', 'in_progress', 'done']
                  .filter((t) => t !== item.status)
                  ?.map((status) => (
                    <DropdownMenu.Item
                      key={status}
                      className="pl-2 flex flex-1 items-center justify-center py-1 hover:bg-gray-500"
                      onClick={() => {
                        moveItem(item.id, status as KanbanItemStatus);
                      }}
                    >
                      {status}
                    </DropdownMenu.Item>
                  ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Item onClick={() => deleteItem(item.id)} className='flex items-center flex-1 gap-2 p-1 text-md hover:bg-gray-500'>
            <Trash2 size={"1em"}/>
            delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropMenu>
      <div
        {...attributes}
        {...listeners}
        className="flex flex-col max-w-sm p-6"
      >
        <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <h3>{item.title}</h3>
        </div>
        <div className="kanban-item__description">
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
}
