import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Lines } from '@/components/common/Display';
import { StockPhoto } from '@/components/common/StockPhoto';
import { Button } from '@/components/ui/button';
import { company, socialLinks, addressLines } from '@/data/company';
import { services, getService } from '@/data/services';
import { FloatingStones } from '@/components/common/FloatingStones';
import { cn } from '@/utils/cn';

/*
 * Contact / Start a project.
 * With VITE_WEB3FORMS_KEY set, the form emails the enquiry directly (Web3Forms delivers it to the
 * inbox registered with the key). Success is only shown when the service confirms delivery.
 * Without a key, the form opens the visitor's email app addressed to VITE_CONTACT_EMAIL.
 */

const schema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .refine((v) => v === '' || /^[+\d][\d\s()-]{6,}$/.test(v), 'Please enter a valid phone number, or leave it empty.'),
  service: z.string(),
  message: z.string().trim().min(10, 'A sentence or two helps us reply usefully.').max(4000),
  botcheck: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const field = (err?: boolean) =>
  cn(
    'mt-2 w-full rounded-xl border bg-surface/60 px-4 py-3.5 text-white placeholder:text-muted focus:outline-none',
    err ? 'border-red-400/80 focus:border-red-300' : 'border-white/15 focus:border-spark',
  );

export default function ContactPage() {
  const crumbs = [{ name: 'Contact', path: '/contact' }];
  const [params] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'mailto'>('idle');
  const canSend = Boolean(company.contact.formKey);
  const canMail = Boolean(company.contact.email);

  const { register, handleSubmit, setValue, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', service: '', message: '', botcheck: '' },
  });
  const errors = formState.errors;

  useEffect(() => {
    const svc = params.get('service');
    if (svc && getService(svc)) setValue('service', svc);
    const industry = params.get('industry');
    if (industry) setValue('message', `Industry: ${industry}\n\n`);
  }, [params, setValue]);

  const onSubmit = async (v: FormValues) => {
    if (v.botcheck) return; // spam trap
    const serviceName = getService(v.service)?.name ?? 'Not sure yet';
    if (canSend) {
      setStatus('sending');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: company.contact.formKey,
            subject: `New project enquiry from ${v.name}`,
            from_name: 'FLINTORA website',
            name: v.name,
            email: v.email,
            phone: v.phone || '-',
            service: serviceName,
            message: v.message,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) throw new Error(json.message || 'Failed');
        setStatus('sent');
        reset();
      } catch {
        setStatus('error');
      }
      return;
    }
    if (canMail) {
      const body = `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '-'}\nService: ${serviceName}\n\n${v.message}`;
      window.location.href = `mailto:${company.contact.email}?subject=${encodeURIComponent(`Project enquiry from ${v.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
    }
  };

  const channels = [
    company.contact.email && { icon: Mail, label: 'Email', value: company.contact.email, href: `mailto:${company.contact.email}` },
    company.contact.phone && { icon: Phone, label: 'Phone', value: company.contact.phone, href: `tel:${company.contact.phone.replace(/[^\d+]/g, '')}` },
    company.contact.whatsapp && { icon: MessageCircle, label: 'WhatsApp', value: 'Message us', href: `https://wa.me/${company.contact.whatsapp}`, external: true },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string; external?: boolean }[];

  return (
    <>
      <Seo
        path="/contact"
        title="Contact & Start a Project"
        pageType="ContactPage"
        description="Start a project with FLINTORA. Tell us about your brand, website, marketing or digital idea and we will get back to you."
        breadcrumbs={crumbs}
      />
      <section className="relative overflow-hidden bg-void pb-[clamp(3.5rem,2rem+6vw,8rem)] pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <div aria-hidden className="absolute -right-40 top-10 size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(255,128,13,0.12),transparent_62%)]" />
        <FloatingStones preset="single" />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <h1 className="display hero-rise t-xl mt-8">
            <Lines lines={['Start a', 'project.']} accent={[1]} />
          </h1>
          <p className="hero-fade t-lead mt-6 max-w-[48ch] text-soft" style={{ ['--d' as string]: '0.4s' }}>
            Tell us about your idea, your goals and your timeline. We read every message personally and will get back to you.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {status === 'sent' ? (
                <div role="status" className="rounded-[1.25rem] border border-spark/40 bg-spark/10 p-8">
                  <CheckCircle2 aria-hidden className="size-8 text-spark" />
                  <h2 className="mt-4 text-2xl font-semibold">Thank you. Your message has been sent.</h2>
                  <p className="mt-2 text-soft">We will be in touch soon.</p>
                  <Button type="button" variant="ghost" size="sm" className="mt-6" onClick={() => setStatus('idle')}>
                    <span className="relative z-10">Send another message</span>
                  </Button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Start a project">
                  <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register('botcheck')} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-[0.9rem] text-soft">
                      Name <span className="text-spark">*</span>
                      <input autoComplete="name" className={field(!!errors.name)} aria-invalid={!!errors.name} aria-describedby="e-name" {...register('name')} />
                      {errors.name && <span id="e-name" className="mt-1.5 block text-[0.85rem] text-red-300">{errors.name.message}</span>}
                    </label>
                    <label className="block text-[0.9rem] text-soft">
                      Email <span className="text-spark">*</span>
                      <input type="email" inputMode="email" autoComplete="email" className={field(!!errors.email)} aria-invalid={!!errors.email} aria-describedby="e-email" {...register('email')} />
                      {errors.email && <span id="e-email" className="mt-1.5 block text-[0.85rem] text-red-300">{errors.email.message}</span>}
                    </label>
                    <label className="block text-[0.9rem] text-soft">
                      Phone <span className="text-muted">(optional)</span>
                      <input type="tel" inputMode="tel" autoComplete="tel" className={field(!!errors.phone)} aria-invalid={!!errors.phone} aria-describedby="e-phone" {...register('phone')} />
                      {errors.phone && <span id="e-phone" className="mt-1.5 block text-[0.85rem] text-red-300">{errors.phone.message}</span>}
                    </label>
                    <label className="block text-[0.9rem] text-soft">
                      What do you need?
                      <select className={field()} {...register('service')}>
                        <option value="">Not sure yet</option>
                        {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="block text-[0.9rem] text-soft">
                    Tell us about your project <span className="text-spark">*</span>
                    <textarea rows={6} placeholder="What do you want to achieve? Any deadlines or budget in mind?" className={field(!!errors.message)} aria-invalid={!!errors.message} aria-describedby="e-msg" {...register('message')} />
                    {errors.message && <span id="e-msg" className="mt-1.5 block text-[0.85rem] text-red-300">{errors.message.message}</span>}
                  </label>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button type="submit" disabled={status === 'sending' || (!canSend && !canMail)}>
                      <span className="relative z-10">{status === 'sending' ? 'Sending…' : canSend ? 'Send message' : 'Send by email'}</span>
                      <ArrowRight aria-hidden className="relative z-10 size-4" />
                    </Button>
                    <p className="text-[0.82rem] text-muted">We only use your details to reply to this enquiry.</p>
                  </div>
                  <p role="status" className="min-h-6 text-[0.92rem]">
                    {status === 'error' && (
                      <span className="text-red-300">
                        Sorry, the message could not be sent.{canMail ? <> Please email us at <a className="underline" href={`mailto:${company.contact.email}`}>{company.contact.email}</a>.</> : ' Please try again in a moment.'}
                      </span>
                    )}
                    {status === 'mailto' && <span className="text-flare">Your email app should open with the message ready. It is sent when you press send there.</span>}
                    {!canSend && !canMail && <span className="text-muted">The contact form is being set up. Please check back shortly.</span>}
                  </p>
                </form>
              )}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
                <StockPhoto name="contact" ratio="4:3" sizes="(min-width:1024px) 30vw, 100vw" className="mb-8 aspect-[4/3] rounded-[1rem] max-lg:hidden" />
                <ul className={cn(channels.length > 0 && 'border-t border-white/10')}>
                  {channels.map((c) => (
                    <li key={c.label} className="border-b border-white/10">
                      <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4 py-5">
                        <c.icon aria-hidden className="size-5 shrink-0 text-spark" />
                        <span className="min-w-0">
                          <span className="eyebrow block text-muted">{c.label}</span>
                          <span className="block break-words font-semibold group-hover:text-spark">{c.value}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                {addressLines.length > 0 && (
                  <div className="mt-6 flex gap-4 text-soft">
                    <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-spark" />
                    <address className="not-italic">
                      {addressLines.map((l) => <span key={l} className="block">{l}</span>)}
                      {company.local.mapsUrl && <a href={company.local.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-2 inline-block text-white">Open in Google Maps</a>}
                    </address>
                  </div>
                )}
                {socialLinks.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {socialLinks.map((s) => (
                      <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer me" className="inline-block rounded-full border border-white/15 px-4 py-2 text-[0.88rem] hover:border-spark">{s.name}</a></li>
                    ))}
                  </ul>
                )}
              </aside>
          </div>
        </div>
      </section>
    </>
  );
}
