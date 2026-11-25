import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Eyebrow({ children, className, n }: { children: ReactNode; className?: string; n?: string }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3 text-spark', className)}>
      {n && <span className="font-display tracking-[0.1em]">{n}</span>}
      <span aria-hidden className="h-px w-8 bg-current" />
      <span>{children}</span>
    </p>
  );
}
