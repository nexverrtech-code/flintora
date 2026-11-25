import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Info } from 'lucide-react';
import { addOns, complexities, projectTypes, ratesVerified, roundNice, scopes, timelines } from '@/data/pricing';
import { company } from '@/data/company';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/utils/format';
import { storage, PROJECT_PREFILL_KEY, type ProjectPrefill } from '@/utils/storage';
import { cn } from '@/utils/cn';

function Choice<T extends { id: string; label: string; note?: string }>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: T[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow text-muted">{legend}</legend>
      <div role="radiogroup" aria-label={legend} className="mt-4 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o.id}
            className={cn(
              'flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors',
              value === o.id ? 'border-spark bg-spark/10' : 'border-white/12 hover:border-white/35',
            )}
          >
            <input type="radio" name={legend} checked={value === o.id} onChange={() => onChange(o.id)} className="mt-1 size-4 shrink-0 accent-spark" />
            <span>
              <span className="block font-semibold">{o.label}</span>
              {o.note && <span className="block text-[0.82rem] text-muted">{o.note}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Estimator() {
  const navigate = useNavigate();
  const [type, setType] = useState(projectTypes[1].id);
  const [scope, setScope] = useState('standard');
  const [complexity, setComplexity] = useState('moderate');
  const [extras, setExtras] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('standard');

  const est = useMemo(() => {
    const t = projectTypes.find((p) => p.id === type)!;
    const f = scopes.find((s) => s.id === scope)!.factor * complexities.find((c) => c.id === complexity)!.factor * timelines.find((x) => x.id === timeline)!.factor;
    const add = addOns.filter((a) => extras.includes(a.id)).reduce((n, a) => [n[0] + a.amount[0], n[1] + a.amount[1]], [0, 0]);
    return { low: roundNice(t.base[0] * f + add[0]), high: roundNice(t.base[1] * f + add[1]), recurring: t.recurring, label: t.label };
  }, [type, scope, complexity, extras, timeline]);

  const toProject = () => {
    const prefill: ProjectPrefill = {
      budget: `${formatMoney(est.low)} to ${formatMoney(est.high)}${est.recurring ? ' per month' : ''} (indicative estimate)`,
      description: `Budget Estimator: ${est.label}, ${scope} scope, ${complexity} complexity, ${timeline} timeline${extras.length ? `, extras: ${addOns.filter((a) => extras.includes(a.id)).map((a) => a.label).join(', ')}` : ''}.`,
      source: 'estimator',
    };
    storage.set(PROJECT_PREFILL_KEY, prefill, 'session');
    navigate('/start-a-project');
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="space-y-10 lg:col-span-7">
        <Choice legend="Project type" options={projectTypes} value={type} onChange={setType} />
        <Choice legend="Required scope" options={scopes} value={scope} onChange={setScope} />
        <Choice legend="Complexity" options={complexities} value={complexity} onChange={setComplexity} />
        <fieldset>
          <legend className="eyebrow text-muted">Additional deliverables</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {addOns.map((a) => {
              const on = extras.includes(a.id);
              return (
                <label key={a.id} className={cn('flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors', on ? 'border-spark bg-spark/10' : 'border-white/12 hover:border-white/35')}>
                  <input type="checkbox" checked={on} onChange={() => setExtras(on ? extras.filter((x) => x !== a.id) : [...extras, a.id])} className="size-4 accent-spark" />
                  <span className="font-semibold">{a.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <Choice legend="Timeline" options={timelines} value={timeline} onChange={setTimeline} />
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-[calc(var(--header-h)+2rem)] overflow-hidden rounded-[1.25rem] border border-white/10 bg-surface p-8">
          <div aria-hidden className="absolute -right-20 -top-20 size-64 rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.3),transparent_65%)]" />
          <p className="eyebrow relative text-spark">Indicative estimate</p>
          <p className="relative mt-4 text-[clamp(1.8rem,1.3rem+1.8vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em]" aria-live="polite">
            {formatMoney(est.low)} – {formatMoney(est.high)}
            {est.recurring && <span className="block text-base font-normal text-soft">per month, excluding ad spend</span>}
          </p>
          <p className="relative mt-3 text-[0.9rem] text-soft">{est.label}</p>
          <div className="relative mt-8 flex gap-3 rounded-xl border border-white/10 bg-void/50 p-4 text-[0.85rem] text-soft">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-flare" />
            <p>
              <strong className="font-semibold text-white">This is not a formal quotation.</strong>{' '}
              {ratesVerified
                ? 'It is calculated from our indicative rate card and your selections.'
                : 'It uses illustrative planning ranges, not FLINTORA’s published rates.'}{' '}
              A real proposal depends on a conversation about your goals. Amounts in {company.currency}.
            </p>
          </div>
          <Button type="button" onClick={toProject} className="relative mt-8 w-full">
            <span className="relative z-10">Discuss this project</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
