import type { Visual } from '@/data/projects';
import { Picture } from '@/components/common/Picture';
import { ProjectArt } from './ProjectArt';
import { cn } from '@/utils/cn';

export function VisualMedia({ visual, className, sizes, priority }: { visual: Visual; className?: string; sizes?: string; priority?: boolean }) {
  if (visual.type === 'image')
    return <Picture src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes={sizes} priority={priority} className={cn('block h-full w-full', className)} />;
  return <ProjectArt art={visual.art} title={visual.alt} className={cn('h-full w-full', className)} />;
}
