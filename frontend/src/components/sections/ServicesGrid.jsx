import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container.jsx';
import SectionTitle from '@/components/ui/SectionTitle.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import { services } from '@/content/services.js';

export function ServiceCard({ s }) {
  return (
    <Link to={`/services/${s.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={s.image} alt={s.imageAlt} loading="lazy" width="880" height="520"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-green-600">{s.category}</span>
        <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{s.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function ServicesGrid() {
  return (
    <section className="section bg-white">
      <Container>
        <SectionTitle eyebrow="Our Services" title="Evidence-based programs, built around your child" align="center" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.07}><ServiceCard s={s} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
