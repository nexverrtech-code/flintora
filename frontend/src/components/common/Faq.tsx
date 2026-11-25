import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/utils/cn';

export function Faq({ items, className }: { items: { q: string; a: string }[]; className?: string }) {
  return (
    <Accordion type="single" collapsible className={cn('border-t border-current/15', className)}>
      {items.map((item, i) => (
        <AccordionItem value={`q${i}`} key={item.q}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
