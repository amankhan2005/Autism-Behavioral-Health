import { useParams, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Seo from '../../components/seo/Seo.jsx';
import { serviceSchema, faqSchema, breadcrumbSchema } from '../../lib/seo.js';
import Container from '../../components/ui/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Breadcrumb from '../../components/ui/Breadcrumb.jsx';
import Button from '../../components/ui/Button.jsx';
import Accordion from '../../components/ui/Accordion.jsx';
import { process } from '../../content/process.js';
import { getService } from '../../content/services.js';

export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = getService(slug);
  if (!svc) return <Navigate to="/services" replace />;

  const crumb = [{ name: 'Home', to: '/' }, { name: 'Services', to: '/services' }, { name: svc.title, to: `/services/${svc.slug}` }];
  const paragraphs = svc.overview.split('\n\n');

  return (
    <>
      <Seo title={svc.title} description={svc.short} path={`/services/${svc.slug}`}
        schema={[serviceSchema(svc), faqSchema(svc.faqs), breadcrumbSchema(crumb)]} />

      {/* Hero with dedicated image */}
      <section className="border-b border-line bg-cream pt-[76px]">
        <Container className="grid items-center gap-10 py-14 md:py-16 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Breadcrumb items={crumb} />
            <span className="eyebrow">{svc.category}</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tighter2 md:text-5xl">{svc.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{svc.short}</p>
            <Button to="/contact" size="lg" className="mt-7">Get Started</Button>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <img src={svc.image} alt={svc.imageAlt} width="880" height="520" className="aspect-[16/10] w-full object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Overview + What we provide */}
      <section className="section bg-white">
        <Container className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tighter2 md:text-3xl">Overview</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <h2 className="mt-12 text-2xl font-bold tracking-tighter2 md:text-3xl">Who this service supports</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted">{svc.whoFor}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-24 rounded-2xl border border-line bg-surface p-7">
              <h3 className="font-display text-lg font-bold text-ink">What we provide</h3>
              <ul className="mt-5 space-y-3.5">
                {svc.whatWeProvide.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                    <span className="text-sm text-ink/85">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Care process */}
      <section className="section bg-cream">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Care Process</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tighter2 md:text-3xl">How care works</h2>
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 font-display font-extrabold text-white">{p.step}</span>
                  <h3 className="mt-4 font-display font-bold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* What to expect */}
      <section className="section bg-white">
        <Container className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">What To Expect</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tighter2 md:text-3xl">A partnership from day one</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">{svc.whatToExpect}</p>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section bg-surface">
        <Container className="max-w-3xl">
          <Reveal className="text-center">
            <span className="eyebrow justify-center">FAQ</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tighter2 md:text-3xl">Common questions</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 rounded-2xl border border-line bg-white px-6">
            <Accordion items={svc.faqs} />
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-cream">
        <Container>
          <div className="rounded-3xl bg-brand-600 px-6 py-14 text-center text-white md:px-16">
            <h2 className="text-3xl font-extrabold tracking-tighter2 md:text-4xl">Let&rsquo;s take the next step together.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">Reach out to talk through {svc.title.toLowerCase()} for your child. There&rsquo;s no pressure &mdash; just a conversation.</p>
            <Button to="/contact" variant="white" size="lg" className="mt-8">Get Started</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
