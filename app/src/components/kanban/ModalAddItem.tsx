import { X } from 'lucide-react';
import { Dialog } from 'radix-ui';
import { useForm } from 'react-hook-form';
type TaskModalProps = {
  onAddTask?: (title: string, description: string) => void;
};
export default function AddItemScreen({ onAddTask }: TaskModalProps) {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = (values: { title: string; description: string }) => {
    const { title, description } = values;
    if (!title.trim()) return;
    onAddTask?.(title, description);
    reset();
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-blackA-9/50 backdrop-blur-sm" />
      <Dialog.Content
        className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white 
          p-6 shadow-lg dark:bg-gray-800 border-gray-100 border-1"
      >
        <div className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white">
            Add New Task
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <X size={20} />
            </button>
          </Dialog.Close>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task Title"
            {...register('title')}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <textarea
            placeholder="Task Description"
            {...register('description')}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <Dialog.Close asChild>
            <button
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 
              dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Task
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
