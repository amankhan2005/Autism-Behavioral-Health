import { Phone, Mail, MapPin, Clock, Printer } from 'lucide-react';
import Seo from '@/components/seo/Seo.jsx';
import { organizationSchema, breadcrumbSchema } from '@/lib/seo.js';
import Container from '@/components/ui/Container.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import PageHero from '@/components/sections/PageHero.jsx';
import CtaBand from '@/components/sections/CtaBand.jsx';
import ContactPageForm from '@/components/forms/ContactPageForm.jsx';
import { site } from '@/content/site.js';

const details = [
  { icon: MapPin, label: 'Address', value: `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.zip}` },
  { icon: Phone, label: 'Phone', value: site.phone, href: site.phoneHref },
  { icon: Printer, label: 'Fax', value: site.fax },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Autism & Behavioral Health LLC. Reach out with questions or to begin ABA care for your child."
        path="/contact"
        schema={[organizationSchema(), breadcrumbSchema([{ name: 'Home', to: '/' }, { name: 'Contact', to: '/contact' }])]}
      />
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        subtitle="Have a question or ready to begin? Reach out and a real member of our team will get back to you — typically within one business day."
        breadcrumb={[{ name: 'Home', to: '/' }, { name: 'Contact', to: '/contact' }]}
        align="center"
      />

      <section className="section bg-white">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* info */}
          <Reveal>
            <div className="space-y-4">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</p>
                    {href ? <a href={href} className="font-display font-semibold text-ink hover:text-brand-700">{value}</a> : <p className="font-display font-semibold text-ink">{value}</p>}
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><Clock className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Office hours</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {site.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-6"><span className="text-muted">{h.day}</span><span className="font-medium text-ink">{h.time}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* form */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-cream p-7 md:p-9">
              <h2 className="text-xl font-bold tracking-tighter2">Send us a message</h2>
              <p className="mt-2 text-sm text-muted">We&rsquo;ll respond as soon as we can.</p>
              <div className="mt-6"><ContactPageForm /></div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* map */}
      <section className="bg-surface pb-16">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
            <iframe
              title={`Map to ${site.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.zip}`)}&output=embed`}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <CtaBand title="Prefer to talk it through?" text="Call us and a member of our team will be glad to help you get started." />
    </>
  );
}
