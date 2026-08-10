import { useMemo, useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import Seo from '../../components/seo/Seo.jsx';
import { breadcrumbSchema } from '../../lib/seo.js';
import Container from '../../components/ui/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Icon from '../../components/ui/Icon.jsx';
import PageHero from '../../components/sections/PageHero.jsx';
import CtaBand from '../../components/sections/CtaBand.jsx';
import { resources, resourceCategories } from '../../content/resources.js';

// Category → color coding (drawn from the brand + spectrum palette).
const catStyle = {
  'State Services': { icon: 'bg-brand-50 text-brand-600', tag: 'text-brand-700' },
  Autism: { icon: 'bg-pink-50 text-pink-600', tag: 'text-pink-700' },
  'Family Support': { icon: 'bg-green-50 text-green-600', tag: 'text-green-700' },
  Medicaid: { icon: 'bg-amber-50 text-tangerine', tag: 'text-tangerine' },
};

function host(url) {
  try { return new URL(url).host.replace(/^www\./, ''); } catch { return url; }
}

export default function Resources() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesCat = cat === 'All' || r.category === cat;
      const matchesTerm = !term || `${r.title} ${r.description} ${r.category}`.toLowerCase().includes(term);
      return matchesCat && matchesTerm;
    });
  }, [q, cat]);

  return (
    <>
      <Seo
        title="Resources"
        path="/resources"
        ogType="article"
        schema={breadcrumbSchema([{ name: 'Home', to: '/' }, { name: 'Resources', to: '/resources' }])}
      />
      <PageHero
        eyebrow="Resources"
        title="Trusted resources for your family"
        subtitle="A curated directory of Delaware organizations and support lines we recommend to the families we serve."
        breadcrumb={[{ name: 'Home', to: '/' }, { name: 'Resources', to: '/resources' }]}
      />

      <section className="section bg-surface">
        <Container>
          {/* Search + filter */}
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search resources…"
                aria-label="Search resources"
                className="w-full rounded-2xl border border-line bg-white py-4 pl-12 pr-4 text-[15px] shadow-soft focus:border-brand-400"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['All', ...resourceCategories].map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    cat === c ? 'bg-brand-600 text-white' : 'bg-white text-ink ring-1 ring-line hover:bg-brand-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <p className="mt-14 text-center text-muted">No resources match your search. Try a different term or category.</p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r, i) => {
                const c = catStyle[r.category] || catStyle['State Services'];
                return (
                  <Reveal key={r.title} delay={(i % 3) * 0.06}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line transition hover:-translate-y-1 hover:shadow-lift"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${c.icon}`}>
                          <Icon name={r.icon} className="h-6 w-6" />
                        </span>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-muted transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                      <span className={`mt-5 text-xs font-bold uppercase tracking-wider ${c.tag}`}>{r.category}</span>
                      <h2 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink">{r.title}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.description}</p>
                      <span className="mt-4 text-xs font-semibold text-brand-600">{host(r.url)}</span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <CtaBand title="Have questions we can help with?" />
    </>
  );
}
