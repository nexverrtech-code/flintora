// shadcn/ui-style button (cva variants + Radix Slot), adapted to the FLINTORA visual language.
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const buttonVariants = cva(
  'group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-sans text-[0.92rem] font-semibold tracking-[0.01em] transition-[color,background-color,border-color,box-shadow,transform] duration-500 ease-[var(--ease-silk)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flare select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-spark text-void hover:shadow-[0_18px_50px_-18px_rgba(255,128,13,0.9)] before:absolute before:inset-0 before:-z-0 before:translate-y-full before:rounded-full before:bg-flare before:transition-transform before:duration-500 before:ease-[var(--ease-silk)] hover:before:translate-y-0',
        ghost:
          'border border-white/20 text-white hover:border-spark before:absolute before:inset-0 before:translate-y-full before:rounded-full before:bg-white/[0.06] before:transition-transform before:duration-500 hover:before:translate-y-0',
        dark: 'bg-void text-paper hover:bg-ink border border-void',
        outlineDark: 'border border-ink/25 text-ink hover:border-ink before:absolute before:inset-0 before:translate-y-full before:rounded-full before:bg-ink/5 before:transition-transform before:duration-500 hover:before:translate-y-0',
        link: 'rounded-none px-0 text-spark hover:text-flare',
      },
      size: {
        sm: 'min-h-10 px-5',
        md: 'min-h-[3.25rem] px-7',
        lg: 'min-h-14 px-8 text-base',
        icon: 'size-12',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Comp>
  );
});
Button.displayName = 'Button';
