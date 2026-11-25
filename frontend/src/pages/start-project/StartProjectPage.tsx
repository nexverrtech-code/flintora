import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Copy, Download, ExternalLink, Mail, MessageCircle, Pencil } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Lines } from '@/components/common/Display';
import { Button } from '@/components/ui/button';
import { services, getService } from '@/data/services';
import { company, industries, hasEnquiryChannel } from '@/data/company';
import { storage, PROJECT_PREFILL_KEY, type ProjectPrefill } from '@/utils/storage';
import { copyText, downloadText } from '@/utils/clipboard';
import { cn } from '@/utils/cn';

const budgets = ['Not sure yet', 'Under 50,000', '50,000 to 1,50,000', '1,50,000 to 5,00,000', '5,00,000 or more', 'Monthly retainer'];
const timelines = ['As soon as possible', 'Within 1 month', '1 to 3 months', '3 to 6 months', 'Flexible'];

const schema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .refine((v) => v === '' || /^[+\d][\d\s()-]{6,}$/.test(v), 'Please enter a valid phone number, or leave it empty.'),
  company: z.string().trim().max(120),
  industry: z.string().min(1, 'Please choose the closest industry.'),
  services: z.array(z.string()).min(1, 'Choose at least one service, or “Not sure yet”.'),
  description: z.string().trim().min(20, 'A few sentences help us reply usefully (at least 20 characters).').max(4000),
  budget: z.string().min(1, 'Please choose a budget range.'),
  timeline: z.string().min(1, 'Please choose a timeline.'),
});

type FormValues = z.infer<typeof schema>;

const stepsDef: { title: string; prompt: string; fields: FieldPath<FormValues>[] }[] = [
  { title: 'About you', prompt: 'First, who are we talking to?', fields: ['name', 'email', 'phone', 'company'] },
  { title: 'Your project', prompt: 'What are you working on?', fields: ['industry', 'services', 'description'] },
  { title: 'Budget and timing', prompt: 'What are you planning around?', fields: ['budget', 'timeline'] },
];

const input = (err?: boolean) =>
  cn(
    'mt-2 w-full rounded-xl border bg-surface/60 px-4 py-3.5 text-white placeholder:text-muted focus:outline-none',
    err ? 'border-red-400/80 focus:border-red-300' : 'border-white/15 focus:border-spark',
  );

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? <p id={id} className="mt-2 text-[0.85rem] text-red-300">{msg}</p> : null;
}

function summarise(v: FormValues) {
  return [
    'New project enquiry (via flintora website)',
    '',
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    v.company && `Company: ${v.company}`,
    `Industry: ${v.industry}`,
    `Services: ${v.services.map((s) => getService(s)?.name ?? 'Not sure yet').join(', ')}`,
    `Budget: ${v.budget}`,
    `Timeline: ${v.timeline}`,
    '',
    'Project description:',
    v.description,
  ]
    .filter(Boolean)
    .join('\n');
}

export default function StartProjectPage() {
  const crumbs = [{ name: 'Start a Project', path: '/start-a-project' }];
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [note, setNote] = useState('');
  const [prefillSource, setPrefillSource] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', company: '', industry: '', services: [], description: '', budget: '', timeline: '' },
  });
  const { register, handleSubmit, trigger, getValues, setValue, watch, formState } = form;
  const errors = formState.errors;
  const selected = watch('services');

  // Prefill from ?service= and from the planning tools (session only)
  useEffect(() => {
    const svc = params.get('service');
    const pre = storage.get<ProjectPrefill | null>(PROJECT_PREFILL_KEY, null, 'session');
    const list = new Set<string>();
    if (svc && getService(svc)) list.add(svc);
    pre?.services?.forEach((s) => list.add(s));
    if (list.size) setValue('services', [...list]);
    if (pre?.description) setValue('description', pre.description);
    if (pre?.industry && industries.includes(pre.industry)) setValue('industry', pre.industry);
    if (pre?.timeline && timelines.includes(pre.timeline)) setValue('timeline', pre.timeline);
    if (pre?.source) {
      setPrefillSource({ 'brand-studio': 'Brand Transformation Studio', estimator: 'Budget Estimator', 'brief-builder': 'Creative Brief Builder' }[pre.source] ?? '');
      storage.remove(PROJECT_PREFILL_KEY, 'session');
    }
  }, [params, setValue]);

  const goto = (n: number) => {
    setStep(n);
    setNote('');
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  };

  const next = async () => {
    const ok = await trigger(stepsDef[step].fields, { shouldFocus: true });
    if (ok) goto(step + 1);
  };

  const toggleService = (slug: string) => {
    const cur = getValues('services');
    const nextList = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur.filter((s) => (slug === 'not-sure' ? false : s !== 'not-sure')), slug];
    setValue('services', nextList, { shouldValidate: formState.isSubmitted || Boolean(errors.services) });
  };

  const values = getValues();
  const summary = summarise(values);
  const reviewing = step === 3;

  const whatsapp = () => {
    window.open(`https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(summary)}`, '_blank', 'noopener');
    setNote('WhatsApp has opened in a new tab with your message ready. Your enquiry is sent only when you press send in WhatsApp.');
  };
  const email = () => {
    window.location.href = `mailto:${company.contact.email}?subject=${encodeURIComponent(`Project enquiry from ${values.name}`)}&body=${encodeURIComponent(summary)}`;
    setNote('Your email app should open with the enquiry ready. It is sent only when you press send there.');
  };
  const external = async () => {
    await copyText(summary);
    window.open(company.contact.enquiryUrl, '_blank', 'noopener');
    setNote('The enquiry form has opened in a new tab. We copied your summary so you can paste it there.');
  };

  return (
    <>
      <Seo
        path="/start-a-project"
        title="Start a Project"
        pageType="ContactPage"
        description="Tell FLINTORA about your project in a few friendly steps, review everything, then send it through the channel you prefer."
        breadcrumbs={crumbs}
      />
      <section className="relative min-h-[100svh] overflow-hidden bg-void pb-24 pt-[calc(var(--header-h)+3rem)]">
        <div aria-hidden className="absolute -right-40 top-20 size-[50rem] rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.12),transparent_62%)]" />
        <div className="shell relative grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Breadcrumbs items={crumbs} />
            <h1 className="display hero-rise t-lg mt-8">
              <Lines lines={["Let's talk", 'about your', 'idea.']} accent={[2]} />
            </h1>
            <p className="mt-6 text-soft">A few questions, about three minutes. You will see everything before anything is sent, and you choose how to send it.</p>
            <ol className="mt-10 space-y-3" aria-label="Progress">
              {[...stepsDef.map((s) => s.title), 'Review and send'].map((t, i) => (
                <li key={t} className={cn('flex items-center gap-4 text-[0.95rem]', i === step ? 'text-white' : i < step ? 'text-soft' : 'text-muted')} aria-current={i === step ? 'step' : undefined}>
                  <span className={cn('grid size-8 place-items-center rounded-full border font-display text-[0.7rem]', i === step ? 'border-spark bg-spark text-void' : i < step ? 'border-spark text-spark' : 'border-white/15')}>{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            {prefillSource && !reviewing && (
              <p className="mb-8 rounded-xl border border-flare/30 bg-flare/[0.06] p-4 text-[0.9rem] text-soft">
                We brought across your answers from the <strong className="text-white">{prefillSource}</strong>. Edit anything you like.
              </p>
            )}
            <form
              noValidate
              onSubmit={handleSubmit(() => goto(3))}
              className={cn(reviewing && 'hidden')}
              aria-labelledby="step-title"
            >
              <p className="text-[0.8rem] text-muted">Step {Math.min(step, 2) + 1} of 3</p>
              <h2 id="step-title" ref={heading} tabIndex={-1} className="mt-2 scroll-mt-32 text-[clamp(1.7rem,1.2rem+1.8vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] outline-none">
                {stepsDef[Math.min(step, 2)].prompt}
              </h2>

              <div className={cn('mt-10 space-y-6', step !== 0 && 'hidden')}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-[0.9rem] text-soft">
                    Your name <span className="text-spark">*</span>
                    <input autoComplete="name" className={input(!!errors.name)} aria-invalid={!!errors.name} aria-describedby="e-name" {...register('name')} />
                    <FieldError id="e-name" msg={errors.name?.message} />
                  </label>
                  <label className="block text-[0.9rem] text-soft">
                    Email <span className="text-spark">*</span>
                    <input type="email" autoComplete="email" inputMode="email" className={input(!!errors.email)} aria-invalid={!!errors.email} aria-describedby="e-email" {...register('email')} />
                    <FieldError id="e-email" msg={errors.email?.message} />
                  </label>
                  <label className="block text-[0.9rem] text-soft">
                    Phone <span className="text-muted">(optional)</span>
                    <input type="tel" autoComplete="tel" inputMode="tel" className={input(!!errors.phone)} aria-invalid={!!errors.phone} aria-describedby="e-phone" {...register('phone')} />
                    <FieldError id="e-phone" msg={errors.phone?.message} />
                  </label>
                  <label className="block text-[0.9rem] text-soft">
                    Company <span className="text-muted">(optional)</span>
                    <input autoComplete="organization" className={input()} {...register('company')} />
                  </label>
                </div>
              </div>

              <div className={cn('mt-10 space-y-8', step !== 1 && 'hidden')}>
                <label className="block text-[0.9rem] text-soft">
                  Industry <span className="text-spark">*</span>
                  <select className={input(!!errors.industry)} aria-invalid={!!errors.industry} aria-describedby="e-industry" {...register('industry')}>
                    <option value="">Choose the closest match</option>
                    {[...industries, 'Other'].map((i) => <option key={i}>{i}</option>)}
                  </select>
                  <FieldError id="e-industry" msg={errors.industry?.message} />
                </label>
                <fieldset aria-describedby="e-services">
                  <legend className="text-[0.9rem] text-soft">Services you are interested in <span className="text-spark">*</span></legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[...services.map((s) => ({ id: s.slug, label: s.name })), { id: 'not-sure', label: 'Not sure yet' }].map((o) => {
                      const on = selected.includes(o.id);
                      return (
                        <button key={o.id} type="button" aria-pressed={on} onClick={() => toggleService(o.id)} className={cn('rounded-full border px-4 py-2.5 text-[0.88rem] transition-colors', on ? 'border-spark bg-spark text-void' : 'border-white/15 text-soft hover:border-white/40 hover:text-white')}>
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                  <FieldError id="e-services" msg={errors.services?.message} />
                </fieldset>
                <label className="block text-[0.9rem] text-soft">
                  Tell us about the project <span className="text-spark">*</span>
                  <textarea rows={6} placeholder="What do you want to achieve? What exists today? Any deadlines or constraints?" className={input(!!errors.description)} aria-invalid={!!errors.description} aria-describedby="e-desc" {...register('description')} />
                  <FieldError id="e-desc" msg={errors.description?.message} />
                </label>
              </div>

              <div className={cn('mt-10 space-y-8', step !== 2 && 'hidden')}>
                {(['budget', 'timeline'] as const).map((key) => (
                  <fieldset key={key} aria-describedby={`e-${key}`}>
                    <legend className="text-[0.9rem] text-soft">{key === 'budget' ? `Approximate budget (${company.currency})` : 'Expected timeline'} <span className="text-spark">*</span></legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {(key === 'budget' ? budgets : timelines).map((o) => (
                        <label key={o} className={cn('flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors', watch(key) === o ? 'border-spark bg-spark/10' : 'border-white/12 hover:border-white/35')}>
                          <input type="radio" value={o} className="size-4 accent-spark" {...register(key)} />
                          {o}
                        </label>
                      ))}
                    </div>
                    <FieldError id={`e-${key}`} msg={errors[key]?.message} />
                  </fieldset>
                ))}
              </div>

              <div className="mt-12 flex items-center justify-between gap-4">
                <Button type="button" variant="ghost" size="sm" onClick={() => goto(step - 1)} disabled={step === 0}>
                  <ArrowLeft aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Back</span>
                </Button>
                {step < 2 ? (
                  <Button type="button" onClick={next}>
                    <span className="relative z-10">Continue</span><ArrowRight aria-hidden className="relative z-10 size-4" />
                  </Button>
                ) : (
                  <Button type="submit">
                    <span className="relative z-10">Review my enquiry</span><ArrowRight aria-hidden className="relative z-10 size-4" />
                  </Button>
                )}
              </div>
            </form>

            {reviewing && (
              <div>
                <p className="text-[0.8rem] text-muted">Final step</p>
                <h2 ref={heading} tabIndex={-1} className="mt-2 scroll-mt-32 text-[clamp(1.7rem,1.2rem+1.8vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] outline-none">
                  Here is your enquiry, {values.name.split(' ')[0]}.
                </h2>
                <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-surface/60 p-7">
                  <dl className="grid gap-x-8 gap-y-5 text-[0.95rem] sm:grid-cols-2">
                    {[
                      ['Name', values.name],
                      ['Email', values.email],
                      ['Phone', values.phone || '—'],
                      ['Company', values.company || '—'],
                      ['Industry', values.industry],
                      ['Services', values.services.map((s) => getService(s)?.name ?? 'Not sure yet').join(', ')],
                      ['Budget', values.budget],
                      ['Timeline', values.timeline],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-muted">{k}</dt>
                        <dd className="break-words">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-muted">Project description</p>
                    <p className="mt-2 whitespace-pre-wrap">{values.description}</p>
                  </div>
                  <button type="button" onClick={() => goto(0)} className="mt-6 inline-flex items-center gap-2 text-[0.9rem] text-spark hover:text-flare">
                    <Pencil aria-hidden className="size-4" /> Edit details
                  </button>
                </div>

                <h3 className="eyebrow mt-12 text-spark">Send it your way</h3>
                {hasEnquiryChannel ? (
                  <p className="mt-3 text-soft">Choose a channel. Nothing is sent from this page; your message opens in the app you pick and you send it from there.</p>
                ) : (
                  <p className="mt-3 rounded-xl border border-white/10 p-5 text-soft">
                    Direct enquiry channels are not set up on this site yet, so nothing can be sent from here. Copy or download your summary and share it with FLINTORA through the channel you already use.
                  </p>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  {company.contact.whatsapp && (
                    <Button type="button" onClick={whatsapp}>
                      <MessageCircle aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Continue on WhatsApp</span>
                    </Button>
                  )}
                  {company.contact.email && (
                    <Button type="button" variant={company.contact.whatsapp ? 'ghost' : 'primary'} onClick={email}>
                      <Mail aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Send by email</span>
                    </Button>
                  )}
                  {company.contact.enquiryUrl && (
                    <Button type="button" variant="ghost" onClick={external}>
                      <ExternalLink aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Open enquiry form</span>
                    </Button>
                  )}
                  <Button type="button" variant="ghost" onClick={async () => setNote((await copyText(summary)) ? 'Summary copied to your clipboard.' : 'Copy failed. Please use Download instead.')}>
                    <Copy aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Copy summary</span>
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => { downloadText('flintora-project-enquiry.txt', summary); setNote('Summary downloaded as a text file.'); }}>
                    <Download aria-hidden className="relative z-10 size-4" /><span className="relative z-10">Download</span>
                  </Button>
                </div>
                <p className="mt-5 min-h-6 text-[0.92rem] text-flare" role="status">{note}</p>
                <p className="mt-6 text-[0.82rem] text-muted">
                  Your details stay in this browser until you send them yourself. See our <Link to="/privacy-policy" className="link-line">privacy policy</Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
