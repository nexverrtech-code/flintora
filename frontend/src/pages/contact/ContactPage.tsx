import { Link } from 'react-router';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Eyebrow } from '@/components/common/Eyebrow';
import { CtaLink } from '@/components/common/CtaLink';
import { Lines } from '@/components/common/Display';
import { Faq } from '@/components/common/Faq';
import { Reveal } from '@/components/animation/Reveal';
import { EmberField } from '@/components/interactive/EmberField';
import { company, socialLinks, addressLines } from '@/data/company';
import { faqSchema } from '@/utils/schema';

const faqs = [
  { q: 'What happens after I get in touch?', a: 'We read every enquiry personally and reply with questions or a suggested next step, usually a short call to understand your goals.' },
  { q: 'What should I include in my first message?', a: 'A little about your business, what you want to achieve, any deadlines and an idea of budget. The Start a Project page walks you through it.' },
  { q: 'Do you sign non-disclosure agreements?', a: 'Yes. If your project is confidential, tell us and we will sign an NDA before you share details.' },
  { q: 'Can we meet in person?', a: 'Often, yes. Let us know where you are based and we will find the best way to work together.' },
];

export default function ContactPage() {
  const crumbs = [{ name: 'Contact', path: '/contact' }];
  const channels = [
    company.contact.email && { icon: Mail, label: 'Email', value: company.contact.email, href: `mailto:${company.contact.email}` },
    company.contact.phone && { icon: Phone, label: 'Phone', value: company.contact.phone, href: `tel:${company.contact.phone.replace(/[^\d+]/g, '')}` },
    company.contact.whatsapp && { icon: MessageCircle, label: 'WhatsApp', value: 'Message us on WhatsApp', href: `https://wa.me/${company.contact.whatsapp}`, external: true },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string; external?: boolean }[];

  return (
    <>
      <Seo
        path="/contact"
        title="Contact"
        pageType="ContactPage"
        description="Get in touch with FLINTORA, a creative and digital studio. Tell us about your brand, website, marketing or digital project."
        breadcrumbs={crumbs}
        schema={[faqSchema(faqs)]}
      />
      <section className="relative overflow-hidden bg-void pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <EmberField density={0.5} />
        <div className="shell relative grid gap-16 pb-24 lg:grid-cols-12 lg:pb-32">
          <div className="lg:col-span-6">
            <Breadcrumbs items={crumbs} />
            <h1 className="display hero-rise t-hero mt-10">
              <Lines lines={['Say', 'hello.']} accent={[1]} />
            </h1>
            <p className="hero-fade t-lead mt-10 max-w-[34ch] text-soft" style={{ ['--d' as string]: '0.45s' }}>
              Behind every enquiry is a person with an idea. We would love to hear yours, whether it is fully formed or still a spark.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-28">
            {channels.length > 0 ? (
              <ul className="border-t border-white/10">
                {channels.map((c) => (
                  <li key={c.label} className="border-b border-white/10">
                    <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-5 py-6">
                      <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 text-spark transition-colors group-hover:border-spark group-hover:bg-spark group-hover:text-void">
                        <c.icon aria-hidden className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow block text-muted">{c.label}</span>
                        <span className="mt-1 block break-words text-lg font-semibold transition-colors group-hover:text-spark">{c.value}</span>
                      </span>
                      <ArrowUpRight aria-hidden className="ml-auto size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-spark" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-[1.25rem] border border-white/10 bg-surface/60 p-8">
                <p className="font-semibold">Direct contact details will be listed here.</p>
                <p className="mt-3 text-soft">
                  Until then, the quickest way to reach us is the Start a Project page. It helps you put your idea into words, and you choose how to share it.
                </p>
              </div>
            )}
            {addressLines.length > 0 && (
              <div className="mt-8 flex gap-4 text-soft">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-spark" />
                <address className="not-italic">{addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
              </div>
            )}
            {socialLinks.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {socialLinks.map((s) => (
                  <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer me" className="inline-block rounded-full border border-white/15 px-4 py-2 text-[0.9rem] hover:border-spark">{s.name}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="shell section-y grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-[#a34b00]">Start a project</Eyebrow>
            <h2 className="display t-lg mt-6 max-w-[14ch]">Have a project in mind?</h2>
          </div>
          <Reveal className="lg:col-span-5">
            <p className="text-ink/70">Our guided project conversation takes about three minutes. You review everything before it goes anywhere.</p>
            <CtaLink to="/start-a-project" variant="dark" className="mt-8">Start a project</CtaLink>
            <p className="mt-6 text-[0.9rem] text-ink/60">
              Not sure what you need? Try the <Link to="/brand-studio" className="link-line text-ink">Brand Transformation Studio</Link> or the <Link to="/growth-intelligence" className="link-line text-ink">Growth Intelligence tools</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-void">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display t-md mt-6">Before you write</h2>
          </div>
          <Faq items={faqs} className="lg:col-span-7 lg:col-start-6" />
        </div>
      </section>
    </>
  );
}
