import { useState } from 'react';
import { DropdownMenu } from 'radix-ui';
import { EllipsisVertical } from 'lucide-react';
type DropMenuProps = {
  children: React.ReactElement;
  title?: string;
  customIcon?: React.ReactElement | React.ReactNode;
};
export default function DropMenu({ children }: DropMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex size-[35px] self-end items-center justify-center rounded-full text-violet11 "
          aria-label="Customise options"
        >
          <EllipsisVertical />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>{children}</DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
