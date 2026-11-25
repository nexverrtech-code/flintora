import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Copy, RotateCcw } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { Lines } from '@/components/common/Display';
import { Button } from '@/components/ui/button';
import { services, getService } from '@/data/services';
import {
  businessTypes,
  challengeOptions,
  directions,
  industryOptions,
  nextSteps,
  presenceOptions,
  resultOptions,
  rules,
  SELECTED_WEIGHT,
  type Option,
} from '@/data/brandStudio';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useMounted } from '@/hooks/useMounted';
import { storage, PROJECT_PREFILL_KEY, type ProjectPrefill } from '@/utils/storage';
import { copyText } from '@/utils/clipboard';
import { cn } from '@/utils/cn';

interface Answers {
  business?: string;
  industry?: string;
  presence?: string;
  challenge?: string;
  result?: string;
  services: string[];
}

const empty: Answers = { services: [] };

const steps: { key: keyof Answers; title: string; help: string; options: Option[]; multi?: boolean }[] = [
  { key: 'business', title: 'What kind of organisation are you?', help: 'This shapes the scale of what we suggest.', options: businessTypes },
  { key: 'industry', title: 'Which industry are you in?', help: 'Pick the closest match.', options: industryOptions },
  { key: 'presence', title: 'What is your online presence today?', help: 'Be honest. There is no wrong answer.', options: presenceOptions },
  { key: 'challenge', title: 'What is your main challenge right now?', help: 'Choose the one that matters most.', options: challengeOptions },
  { key: 'result', title: 'What result would make the biggest difference?', help: 'Think twelve months ahead.', options: resultOptions },
  {
    key: 'services',
    title: 'Any services you already know you need?',
    help: 'Optional. Select any that apply, or skip.',
    options: services.map((s) => ({ id: s.slug, label: s.name })),
    multi: true,
  },
];

const label = (opts: Option[], id?: string) => opts.find((o) => o.id === id)?.label ?? '';

function recommend(a: Answers) {
  const score: Record<string, number> = {};
  const reasons: Record<string, string[]> = {};
  const add = (key: string, why: string) => {
    for (const [slug, w] of Object.entries(rules[key] ?? {})) {
      score[slug] = (score[slug] ?? 0) + w;
      (reasons[slug] ??= []).push(why);
    }
  };
  if (a.challenge) add(`challenge:${a.challenge}`, `your challenge: “${label(challengeOptions, a.challenge)}”`);
  if (a.result) add(`result:${a.result}`, `your goal: “${label(resultOptions, a.result)}”`);
  if (a.presence) add(`presence:${a.presence}`, `your current presence: “${label(presenceOptions, a.presence)}”`);
  for (const s of a.services) {
    score[s] = (score[s] ?? 0) + SELECTED_WEIGHT;
    (reasons[s] ??= []).push('you selected it');
  }
  return Object.entries(score)
    .sort((x, y) => y[1] - x[1])
    .slice(0, 4)
    .map(([slug, pts]) => ({ service: getService(slug)!, pts, reasons: reasons[slug] }))
    .filter((r) => r.service);
}

export default function BrandStudioPage() {
  const crumbs = [{ name: 'Brand Transformation Studio', path: '/brand-studio' }];
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [answers, setAnswers] = usePersistentState<Answers>('flintora:brand-studio', empty, remember);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const mounted = useMounted();
  const heading = useRef<HTMLHeadingElement>(null);
  const done = step >= steps.length;
  const recs = useMemo(() => recommend(answers), [answers]);

  const current = steps[Math.min(step, steps.length - 1)];
  const value = answers[current.key];
  const canNext = current.multi || Boolean(value);

  const go = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => heading.current?.focus());
  };

  const choose = (id: string) => {
    if (current.multi) {
      setAnswers((a) => ({ ...a, services: a.services.includes(id) ? a.services.filter((x) => x !== id) : [...a.services, id] }));
    } else {
      const key = current.key;
      setAnswers((a) => ({ ...a, [key]: id }));
    }
  };

  const summary = () =>
    [
      'FLINTORA Brand Transformation Studio summary',
      '',
      `Organisation: ${label(businessTypes, answers.business)}`,
      `Industry: ${label(industryOptions, answers.industry)}`,
      `Current presence: ${label(presenceOptions, answers.presence)}`,
      `Main challenge: ${label(challengeOptions, answers.challenge)}`,
      `Desired result: ${label(resultOptions, answers.result)}`,
      answers.services.length ? `Services selected: ${answers.services.map((s) => getService(s)?.name).join(', ')}` : '',
      '',
      'Suggested capabilities:',
      ...recs.map((r) => `- ${r.service.name}`),
      '',
      `Suggested direction: ${answers.challenge ? directions[answers.challenge] : ''}`,
    ]
      .filter((l) => l !== undefined)
      .join('\n');

  const toProject = () => {
    const prefill: ProjectPrefill = {
      services: recs.map((r) => r.service.slug),
      industry: label(industryOptions, answers.industry),
      description: `From the Brand Transformation Studio:\nMain challenge: ${label(challengeOptions, answers.challenge)}\nDesired result: ${label(resultOptions, answers.result)}\nCurrent presence: ${label(presenceOptions, answers.presence)}`,
      source: 'brand-studio',
    };
    storage.set(PROJECT_PREFILL_KEY, prefill, 'session');
    navigate('/start-a-project');
  };

  return (
    <>
      <Seo
        path="/brand-studio"
        title="Brand Transformation Studio"
        description="Answer six quick questions about your business and get a transparent, rule-based suggestion of the creative and digital support that could help. No sign-up required."
        breadcrumbs={crumbs}
      />
      <section className="relative min-h-[100svh] overflow-hidden bg-void pb-24 pt-[calc(var(--header-h)+3rem)]">
        <div aria-hidden className="absolute -left-40 top-1/3 size-[50rem] rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.1),transparent_62%)]" />
        <div className="shell relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Breadcrumbs items={crumbs} />
            <h1 className="display hero-rise t-lg mt-8">
              <Lines lines={['Brand', 'Transformation', 'Studio']} accent={[2]} />
            </h1>
            <p className="mt-6 text-soft">
              Six questions to help you see what kind of creative support fits your situation. It takes about a minute, needs no account and runs entirely in your browser.
            </p>
            <details className="mt-8 rounded-xl border border-white/10 p-5 text-[0.9rem] text-soft open:bg-surface/50">
              <summary className="cursor-pointer font-semibold text-white">How the suggestions work</summary>
              <p className="mt-3">
                This is a planning aid, not an AI diagnosis or a professional audit. Each answer adds points to related capabilities using fixed, published rules. Services you select yourself get {SELECTED_WEIGHT} points. The highest totals are shown, with the reasons.
              </p>
            </details>
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-[0.9rem] text-soft">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mt-1 size-4 accent-spark" />
              Remember my answers on this device (stored only in this browser)
            </label>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {/* progress */}
            <div className="flex items-center gap-2" aria-hidden>
              {steps.map((_, i) => (
                <span key={i} className={cn('h-1 flex-1 rounded-full transition-colors duration-500', i < step || done ? 'bg-spark' : i === step ? 'bg-white/50' : 'bg-white/10')} />
              ))}
            </div>
            <p className="mt-4 text-[0.8rem] text-muted">{done ? 'Your result' : `Question ${step + 1} of ${steps.length}`}</p>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.fieldset
                  key={step}
                  initial={mounted ? { opacity: 0, x: 30 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8"
                >
                  <legend className="contents">
                    <h2 ref={heading} tabIndex={-1} className="text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] outline-none">{current.title}</h2>
                  </legend>
                  <p className="mt-3 text-soft">{current.help}</p>
                  <div role={current.multi ? 'group' : 'radiogroup'} aria-label={current.title} className="mt-8 grid gap-3 sm:grid-cols-2">
                    {current.options.map((o) => {
                      const selected = current.multi ? answers.services.includes(o.id) : value === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          role={current.multi ? 'checkbox' : 'radio'}
                          aria-checked={selected}
                          onClick={() => choose(o.id)}
                          className={cn(
                            'flex min-h-16 items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-[border-color,background-color] duration-300',
                            selected ? 'border-spark bg-spark/10 text-white' : 'border-white/12 bg-surface/50 text-soft hover:border-white/35 hover:text-white',
                          )}
                        >
                          <span>{o.label}</span>
                          <span aria-hidden className={cn('grid size-6 shrink-0 place-items-center rounded-full border transition-colors', selected ? 'border-spark bg-spark text-void' : 'border-white/25')}>
                            {selected && <Check className="size-3.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-10 flex items-center justify-between gap-4">
                    <Button type="button" variant="ghost" size="sm" onClick={() => go(step - 1)} disabled={step === 0}>
                      <ArrowLeft aria-hidden className="relative z-10 size-4" /> <span className="relative z-10">Back</span>
                    </Button>
                    <Button type="button" onClick={() => go(step + 1)} disabled={!canNext}>
                      <span className="relative z-10">{step === steps.length - 1 ? (answers.services.length ? 'See my result' : 'Skip and see result') : 'Next'}</span>
                      <ArrowRight aria-hidden className="relative z-10 size-4" />
                    </Button>
                  </div>
                </motion.fieldset>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mt-8">
                  <h2 ref={heading} tabIndex={-1} className="display t-md outline-none">Your direction</h2>

                  <div className="mt-10 rounded-[1.25rem] border border-white/10 bg-surface/60 p-7">
                    <Eyebrow>Your answers</Eyebrow>
                    <dl className="mt-5 grid gap-x-8 gap-y-4 text-[0.95rem] sm:grid-cols-2">
                      {[
                        ['Organisation', label(businessTypes, answers.business)],
                        ['Industry', label(industryOptions, answers.industry)],
                        ['Presence', label(presenceOptions, answers.presence)],
                        ['Challenge', label(challengeOptions, answers.challenge)],
                        ['Goal', label(resultOptions, answers.result)],
                        ['Selected services', answers.services.map((s) => getService(s)?.name).join(', ') || 'None'],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-muted">{k}</dt>
                          <dd className="text-white">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <h3 className="eyebrow mt-12 text-spark">Relevant capabilities</h3>
                  <ol className="mt-5 space-y-3">
                    {recs.map((r, i) => (
                      <li key={r.service.slug} className="rounded-xl border border-white/10 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="font-display text-sm text-spark">0{i + 1}</span>
                            <Link to={`/capabilities/${r.service.slug}`} className="link-line ml-3 text-lg font-semibold hover:text-spark">{r.service.name}</Link>
                          </div>
                          <span className="shrink-0 text-[0.75rem] text-muted">{r.pts} pts</span>
                        </div>
                        <p className="mt-2 text-[0.9rem] text-soft">Because of {r.reasons.join(', ')}.</p>
                      </li>
                    ))}
                  </ol>

                  {answers.challenge && (
                    <>
                      <h3 className="eyebrow mt-12 text-spark">Suggested creative direction</h3>
                      <p className="t-lead mt-4 text-white/90">{directions[answers.challenge]}</p>
                    </>
                  )}
                  {answers.presence && (
                    <>
                      <h3 className="eyebrow mt-12 text-spark">Recommended next steps</h3>
                      <ol className="mt-4 space-y-3">
                        {[...nextSteps[answers.presence], 'Talk it through with us. A short conversation turns this into a concrete plan.'].map((n, i) => (
                          <li key={n} className="flex gap-4"><span className="font-display text-sm text-spark">{i + 1}</span><span className="text-soft">{n}</span></li>
                        ))}
                      </ol>
                    </>
                  )}

                  <p className="mt-10 text-[0.85rem] text-muted">This result is generated from fixed rules and your answers only. It is a starting point for a conversation, not professional advice.</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button type="button" onClick={toProject}>
                      <span className="relative z-10">Continue to Start a Project</span>
                      <ArrowRight aria-hidden className="relative z-10 size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={async () => {
                        setCopied(await copyText(summary()));
                        setTimeout(() => setCopied(false), 2500);
                      }}
                    >
                      <Copy aria-hidden className="relative z-10 size-4" />
                      <span className="relative z-10">{copied ? 'Copied' : 'Copy summary'}</span>
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => { setAnswers(empty); go(0); }}>
                      <RotateCcw aria-hidden className="relative z-10 size-4" /> <span className="relative z-10">Start again</span>
                    </Button>
                  </div>
                  <p className="sr-only" aria-live="polite">{copied ? 'Summary copied to clipboard' : ''}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
