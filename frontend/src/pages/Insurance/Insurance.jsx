import { PhoneCall, FileCheck2, HandCoins, ShieldCheck } from 'lucide-react';
import Seo from '@/components/seo/Seo.jsx';
import { breadcrumbSchema, faqSchema } from '@/lib/seo.js';
import Container from '@/components/ui/Container.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import Accordion from '@/components/ui/Accordion.jsx';
import PageHero from '@/components/sections/PageHero.jsx';
import CtaBand from '@/components/sections/CtaBand.jsx';
import InsuranceLogos from '@/components/sections/InsuranceLogos.jsx';
import InsuranceInquiryForm from '@/components/forms/InsuranceInquiryForm.jsx';
import { site } from '@/content/site.js';

const steps = [
  { icon: FileCheck2, title: 'Share your details', text: 'Tell us your insurance provider using the form below.', accent: 'brand' },
  { icon: PhoneCall, title: 'We verify', text: 'Our team checks your ABA benefits and coverage.', accent: 'green' },
  { icon: HandCoins, title: 'You get clarity', text: 'We explain what’s covered and what to expect — no surprises.', accent: 'pink' },
];

const stepStyles = {
  brand: 'bg-brand-600',
  green: 'bg-green-600',
  pink: 'bg-pink-500',
};

const faqs = [
  { q: 'Do you accept my insurance?', a: 'We work with many major carriers. Submit the form below or call us and we’ll verify your specific plan’s ABA benefits.' },
  { q: 'Is ABA therapy usually covered?', a: 'Many plans cover medically necessary ABA therapy for children with an autism diagnosis. Coverage varies by plan, which is why we verify benefits for you.' },
  { q: 'What if I’m not sure of my coverage?', a: 'That’s exactly what we’re here for. Share what you have and our team will handle the verification and walk you through the details.' },
];

export default function Insurance() {
  return (
    <>
      <Seo
        title="Insurance Accepted"
        description="We work with major insurance carriers and help families verify their ABA therapy benefits. Submit your details and we’ll check your coverage."
        path="/insurance"
        schema={[breadcrumbSchema([{ name: 'Home', to: '/' }, { name: 'Insurance', to: '/insurance' }]), faqSchema(faqs)]}
      />
      <PageHero
        eyebrow="Insurance"
        title="We’ll help you navigate coverage"
        subtitle="Understanding insurance shouldn’t be a barrier to care. Share your details and our team will verify your ABA benefits for you."
        breadcrumb={[{ name: 'Home', to: '/' }, { name: 'Insurance', to: '/insurance' }]}
      />

      {/* Accepted plans — animated logo marquee */}
      <section className="section bg-white">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Accepted Plans</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tighter2 md:text-4xl">Carriers we work with</h2>
            <p className="mt-4 text-muted">Don’t see yours? Contact us — we may still be able to help.</p>
          </Reveal>
        </Container>
        <Container>
          <Reveal className="mt-12">
            <InsuranceLogos />
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="section bg-surface">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">How It Works</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tighter2 md:text-4xl">Coverage, made simple</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: StepIcon, title, text, accent }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl bg-white p-8 shadow-soft ring-1 ring-line">
                  <span className="absolute right-6 top-6 font-display text-sm font-extrabold text-line">0{i + 1}</span>
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${stepStyles[accent]}`}>
                    <StepIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Verification form */}
      <section className="section bg-white">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Verify Benefits</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tighter2 md:text-4xl">Check your coverage</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">Share your insurance details and our team will verify your ABA benefits and follow up with what you need to know.</p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-green-50 p-4 ring-1 ring-green-100">
              <ShieldCheck className="h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
              <p className="text-sm text-ink/80">Prefer to talk? Call us at <a href={site.phoneHref} className="font-semibold text-brand-700">{site.phone}</a>.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-surface p-7 ring-1 ring-line md:p-9">
              <InsuranceInquiryForm />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQs */}
      <section className="section bg-surface">
        <Container className="max-w-3xl">
          <Reveal className="text-center">
            <span className="eyebrow justify-center">FAQ</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tighter2 md:text-4xl">Insurance questions</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 rounded-3xl bg-white px-7 shadow-soft ring-1 ring-line">
            <Accordion items={faqs} />
          </Reveal>
        </Container>
      </section>

      <CtaBand title="Ready to get started?" />
    </>
  );
}
