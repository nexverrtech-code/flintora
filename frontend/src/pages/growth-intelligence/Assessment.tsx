import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { RotateCcw } from 'lucide-react';
import { assessment, scoreBand } from '@/data/assessment';
import { getService } from '@/data/services';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

const total = assessment.reduce((n, c) => n + c.questions.length, 0);

function Ring({ pct }: { pct: number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 180 180" className="size-44" role="img" aria-label={`Overall score ${pct} out of 100`}>
      <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
      <circle
        cx="90"
        cy="90"
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 90 90)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFA912" />
          <stop offset="1" stopColor="#FF800D" />
        </linearGradient>
      </defs>
      <text x="90" y="98" textAnchor="middle" fill="#fff" fontFamily="Konexy, Sora" fontSize="40">{pct}</text>
      <text x="90" y="122" textAnchor="middle" fill="#777" fontFamily="Sora" fontSize="11" letterSpacing="2">OUT OF 100</text>
    </svg>
  );
}

export function Assessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const answered = Object.keys(answers).length;

  const result = useMemo(() => {
    const cats = assessment.map((c) => {
      const max = c.questions.length * 3;
      const got = c.questions.reduce((n, q) => n + (answers[q.id] ?? 0), 0);
      return { ...c, pct: Math.round((got / max) * 100) };
    });
    const overall = Math.round(cats.reduce((n, c) => n + c.pct, 0) / cats.length);
    return { cats, overall, gaps: cats.filter((c) => c.pct < 60).sort((a, b) => a.pct - b.pct) };
  }, [answers]);

  if (showResult) {
    const band = scoreBand(result.overall);
    return (
      <div>
        <div className="grid items-center gap-10 rounded-[1.25rem] border border-white/10 bg-surface/60 p-8 md:grid-cols-[auto_1fr] md:p-10">
          <Ring pct={result.overall} />
          <div>
            <p className="eyebrow text-spark">{band.label}</p>
            <h3 className="mt-3 text-2xl font-semibold">{band.text}</h3>
            <p className="mt-3 text-[0.9rem] text-muted">
              Indicative only. The score reflects your answers to {total} questions, weighted equally. It is not a technical audit of your website or channels.
            </p>
          </div>
        </div>

        <h3 className="eyebrow mt-12 text-muted">Score breakdown</h3>
        <ul className="mt-5 space-y-4">
          {result.cats.map((c) => (
            <li key={c.id}>
              <div className="flex justify-between text-[0.92rem]">
                <span>{c.label}</span>
                <span className="text-muted">{c.pct}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" role="img" aria-label={`${c.label}: ${c.pct} percent`}>
                <div className={cn('h-full rounded-full transition-[width] duration-1000', c.pct < 60 ? 'bg-spark' : 'bg-flare')} style={{ width: `${c.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>

        <h3 className="eyebrow mt-12 text-muted">{result.gaps.length ? 'Identified gaps and suggested improvements' : 'Suggested improvements'}</h3>
        <div className="mt-5 space-y-4">
          {(result.gaps.length ? result.gaps : result.cats.slice().sort((a, b) => a.pct - b.pct).slice(0, 1)).map((g) => {
            const svc = getService(g.service);
            return (
              <div key={g.id} className="rounded-xl border border-white/10 p-6">
                <p className="font-semibold">{g.label}: {g.gap}</p>
                <ul className="mt-4 space-y-2 text-[0.95rem] text-soft">
                  {g.improvements.map((t) => (
                    <li key={t} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-spark" />{t}</li>
                  ))}
                </ul>
                {svc && <Link to={`/capabilities/${svc.slug}`} className="link-line mt-4 inline-block text-[0.9rem] text-spark">Related: {svc.name}</Link>}
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link to="/start-a-project"><span className="relative z-10">Talk to us about the results</span></Link></Button>
          <Button type="button" variant="ghost" onClick={() => { setAnswers({}); setShowResult(false); }}>
            <RotateCcw aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Retake</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setShowResult(true);
      }}
    >
      <p className="text-soft">Answer {total} short questions across five areas. Unanswered questions score zero.</p>
      <div className="mt-10 space-y-14">
        {assessment.map((cat, ci) => (
          <fieldset key={cat.id}>
            <legend className="flex items-center gap-3 text-xl font-semibold">
              <span className="font-display text-sm text-spark">0{ci + 1}</span> {cat.label}
            </legend>
            <div className="mt-6 space-y-8">
              {cat.questions.map((q) => (
                <div key={q.id} role="radiogroup" aria-labelledby={`${q.id}-label`}>
                  <p id={`${q.id}-label`} className="text-white/90">{q.text}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-4">
                    {q.options.map((o, oi) => {
                      const checked = answers[q.id] === oi;
                      return (
                        <label
                          key={o}
                          className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-3 text-[0.88rem] leading-snug transition-colors',
                            checked ? 'border-spark bg-spark/10 text-white' : 'border-white/12 text-soft hover:border-white/35',
                          )}
                        >
                          <input type="radio" name={q.id} checked={checked} onChange={() => setAnswers({ ...answers, [q.id]: oi })} className="size-4 shrink-0 accent-spark" />
                          {o}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="sticky bottom-4 z-20 mt-12 flex items-center justify-between gap-4 rounded-full border border-white/10 bg-surface/90 py-2 pl-6 pr-2 backdrop-blur">
        <span className="text-[0.85rem] text-soft" aria-live="polite">{answered} of {total} answered</span>
        <Button type="submit" size="sm"><span className="relative z-10">See my results</span></Button>
      </div>
    </form>
  );
}
