import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Copy, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { copyText, downloadText } from '@/utils/clipboard';
import { storage, PROJECT_PREFILL_KEY, type ProjectPrefill } from '@/utils/storage';
import { cn } from '@/utils/cn';

const styles = ['Minimal', 'Bold', 'Luxurious', 'Editorial', 'Playful', 'Technical', 'Warm', 'Classic'];
const timelineOptions = ['As soon as possible', 'Within 1 month', '1 to 3 months', '3 to 6 months', 'Flexible'];

interface Brief {
  company: string;
  overview: string;
  website: string;
  objectives: string;
  audience: string;
  style: string[];
  references: string;
  deliverables: string[];
  timeline: string;
  notes: string;
}

const initial: Brief = { company: '', overview: '', website: '', objectives: '', audience: '', style: [], references: '', deliverables: [], timeline: '', notes: '' };

const inputCls = 'mt-2 w-full rounded-xl border border-white/15 bg-surface/60 px-4 py-3 text-white placeholder:text-muted focus:border-spark focus:outline-none';

export function BriefBuilder() {
  const navigate = useNavigate();
  const [b, setB] = useState<Brief>(initial);
  const [status, setStatus] = useState('');
  const set = <K extends keyof Brief>(k: K, v: Brief[K]) => setB((x) => ({ ...x, [k]: v }));
  const toggle = (k: 'style' | 'deliverables', v: string) => set(k, b[k].includes(v) ? b[k].filter((x) => x !== v) : [...b[k], v]);

  const text = useMemo(() => {
    const sec = (t: string, v: string) => (v.trim() ? `${t.toUpperCase()}\n${v.trim()}\n` : '');
    return [
      `CREATIVE BRIEF${b.company ? ` – ${b.company}` : ''}`,
      '',
      sec('Business overview', [b.overview, b.website && `Website: ${b.website}`].filter(Boolean).join('\n')),
      sec('Project objectives', b.objectives),
      sec('Audience', b.audience),
      sec('Visual preferences', [b.style.length ? `Style: ${b.style.join(', ')}` : '', b.references && `References: ${b.references}`].filter(Boolean).join('\n')),
      sec('Required deliverables', b.deliverables.map((d) => `- ${d}`).join('\n')),
      sec('Timeline', b.timeline),
      sec('Additional information', b.notes),
    ]
      .filter((x) => x !== '')
      .join('\n');
  }, [b]);

  const empty = text.split('\n').filter(Boolean).length <= 1;
  const flash = (m: string) => {
    setStatus(m);
    setTimeout(() => setStatus(''), 2500);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <form className="space-y-12 lg:col-span-6" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="space-y-5">
          <legend className="flex items-center gap-3 text-xl font-semibold"><span className="font-display text-sm text-spark">01</span> Business overview</legend>
          <label className="block text-[0.9rem] text-soft">Company or project name<input className={inputCls} value={b.company} onChange={(e) => set('company', e.target.value)} /></label>
          <label className="block text-[0.9rem] text-soft">What does your business do?<textarea rows={3} className={inputCls} value={b.overview} onChange={(e) => set('overview', e.target.value)} /></label>
          <label className="block text-[0.9rem] text-soft">Current website (optional)<input type="url" inputMode="url" placeholder="https://" className={inputCls} value={b.website} onChange={(e) => set('website', e.target.value)} /></label>
        </fieldset>
        <fieldset className="space-y-5">
          <legend className="flex items-center gap-3 text-xl font-semibold"><span className="font-display text-sm text-spark">02</span> Objectives and audience</legend>
          <label className="block text-[0.9rem] text-soft">What should this project achieve?<textarea rows={3} className={inputCls} value={b.objectives} onChange={(e) => set('objectives', e.target.value)} /></label>
          <label className="block text-[0.9rem] text-soft">Who is it for?<textarea rows={2} className={inputCls} value={b.audience} onChange={(e) => set('audience', e.target.value)} /></label>
        </fieldset>
        <fieldset>
          <legend className="flex items-center gap-3 text-xl font-semibold"><span className="font-display text-sm text-spark">03</span> Visual preferences</legend>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Style keywords">
            {styles.map((s) => (
              <button key={s} type="button" aria-pressed={b.style.includes(s)} onClick={() => toggle('style', s)} className={cn('rounded-full border px-4 py-2 text-[0.88rem] transition-colors', b.style.includes(s) ? 'border-spark bg-spark text-void' : 'border-white/15 text-soft hover:border-white/40')}>
                {s}
              </button>
            ))}
          </div>
          <label className="mt-5 block text-[0.9rem] text-soft">Brands or websites you admire (optional)<input className={inputCls} value={b.references} onChange={(e) => set('references', e.target.value)} /></label>
        </fieldset>
        <fieldset>
          <legend className="flex items-center gap-3 text-xl font-semibold"><span className="font-display text-sm text-spark">04</span> Deliverables</legend>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {services.map((s) => (
              <label key={s.slug} className={cn('flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-[0.9rem] transition-colors', b.deliverables.includes(s.name) ? 'border-spark bg-spark/10' : 'border-white/12 hover:border-white/35')}>
                <input type="checkbox" checked={b.deliverables.includes(s.name)} onChange={() => toggle('deliverables', s.name)} className="size-4 accent-spark" />
                {s.name}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="space-y-5">
          <legend className="flex items-center gap-3 text-xl font-semibold"><span className="font-display text-sm text-spark">05</span> Timeline and notes</legend>
          <label className="block text-[0.9rem] text-soft">
            Timeline
            <select className={inputCls} value={b.timeline} onChange={(e) => set('timeline', e.target.value)}>
              <option value="">Select a timeline</option>
              {timelineOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block text-[0.9rem] text-soft">Anything else we should know?<textarea rows={3} className={inputCls} value={b.notes} onChange={(e) => set('notes', e.target.value)} /></label>
        </fieldset>
      </form>

      <div className="lg:col-span-6">
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="rounded-[1.25rem] bg-paper p-8 text-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] md:p-10">
            <p className="eyebrow text-[#a34b00]">Brief preview</p>
            <pre aria-live="polite" className="mt-6 max-h-[55vh] overflow-auto whitespace-pre-wrap font-sans text-[0.92rem] leading-relaxed">
              {empty ? 'Start filling in the form. Your brief will appear here as you type.' : text}
            </pre>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" variant="ghost" size="sm" disabled={empty} onClick={async () => flash((await copyText(text)) ? 'Brief copied' : 'Copy failed')}>
              <Copy aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Copy</span>
            </Button>
            <Button type="button" variant="ghost" size="sm" disabled={empty} onClick={() => { downloadText(`creative-brief${b.company ? `-${b.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : ''}.txt`, text); flash('Brief downloaded'); }}>
              <Download aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Download .txt</span>
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={empty}
              onClick={() => {
                const prefill: ProjectPrefill = { description: text, timeline: b.timeline, source: 'brief-builder' };
                storage.set(PROJECT_PREFILL_KEY, prefill, 'session');
                navigate('/start-a-project');
              }}
            >
              <span className="relative z-10">Continue to Start a Project</span><ArrowRight aria-hidden className="relative z-10 size-4" />
            </Button>
          </div>
          <p className="mt-3 h-5 text-[0.85rem] text-flare" aria-live="polite">{status}</p>
          <p className="text-[0.8rem] text-muted">Your brief stays in this browser. Nothing is sent anywhere unless you choose to share it.</p>
        </div>
      </div>
    </div>
  );
}
