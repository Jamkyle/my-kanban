import { Plus } from 'lucide-react';
import { Dialog } from 'radix-ui';
import React, { ReactElement } from 'react';

export default function ({
  title,
  customIcon,
}: {
  title?: string;
  customIcon?: React.ReactNode | ReactElement;
}) {
  return (
    <Dialog.Trigger
      asChild
      className="flex items-center gap-2 px-4 py-2 text-white justify-end"
    >
      <button>
        {customIcon ? customIcon : <Plus size={18} />}
        {title}
      </button>
    </Dialog.Trigger>
  );
}
