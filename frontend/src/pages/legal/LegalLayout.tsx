import type { ReactNode } from 'react';
import { FloatingStones } from '@/components/common/FloatingStones';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export function LegalLayout({ title, updated, path, children }: { title: string; updated: string; path: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-void pb-24 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
      <FloatingStones preset="single" className="[&>div]:!left-[4%] [&>div]:!right-auto [&>div]:!top-auto [&>div]:!bottom-[8%] max-lg:hidden" />
      <div className="shell relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="display t-lg mt-8">{title}</h1>
          <p className="mt-6 text-[0.9rem] text-muted">Last updated {updated}</p>
        </div>
        <div className="prose-flint lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </section>
  );
}
