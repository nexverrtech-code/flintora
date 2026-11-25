// shadcn/ui-style accordion on Radix primitives.
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as A from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Accordion = A.Root;

export const AccordionItem = forwardRef<ElementRef<typeof A.Item>, ComponentPropsWithoutRef<typeof A.Item>>(
  ({ className, ...props }, ref) => <A.Item ref={ref} className={cn('border-b border-current/15', className)} {...props} />,
);
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = forwardRef<ElementRef<typeof A.Trigger>, ComponentPropsWithoutRef<typeof A.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <A.Header className="flex">
      <A.Trigger
        ref={ref}
        className={cn(
          'group flex flex-1 items-center justify-between gap-6 py-6 text-left text-[1.05rem] font-semibold leading-snug transition-colors hover:text-spark md:text-lg',
          className,
        )}
        {...props}
      >
        {children}
        <Plus aria-hidden className="size-5 shrink-0 text-spark transition-transform duration-500 group-data-[state=open]:rotate-45" />
      </A.Trigger>
    </A.Header>
  ),
);
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = forwardRef<ElementRef<typeof A.Content>, ComponentPropsWithoutRef<typeof A.Content>>(
  ({ className, children, ...props }, ref) => (
    <A.Content
      ref={ref}
      className="overflow-hidden data-[state=closed]:animate-[acc-up_0.35s_ease] data-[state=open]:animate-[acc-down_0.45s_var(--ease-silk)]"
      {...props}
    >
      <div className={cn('max-w-[62ch] pb-6 opacity-75', className)}>{children}</div>
    </A.Content>
  ),
);
AccordionContent.displayName = 'AccordionContent';
