import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/animation/Magnetic';
import { Button, type ButtonProps } from '@/components/ui/button';

interface Props {
  to: string;
  children: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  magnetic?: boolean;
  icon?: boolean;
}

export function CtaLink({ to, children, variant = 'primary', size = 'md', className, magnetic = true, icon = true }: Props) {
  const btn = (
    <Button asChild variant={variant} size={size} className={className}>
      <Link to={to}>
        <span className="relative z-10">{children}</span>
        {icon && (
          <ArrowUpRight
            aria-hidden
            className="relative z-10 size-[1.1em] transition-transform duration-500 ease-[var(--ease-silk)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        )}
      </Link>
    </Button>
  );
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn;
}
