import { AlertCircle } from 'lucide-react';
import Seo from '../../components/seo/Seo.jsx';
import { breadcrumbSchema } from '../../lib/seo.js';
import Container from '../../components/ui/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Button from '../../components/ui/Button.jsx';
import PageHero from '../../components/sections/PageHero.jsx';
import { site } from '../../content/site.js';

const anchor = (h) => 's-' + h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Shared legal template: light hero, desktop table of contents, readable column, callout, CTA.
export default function LegalPage({ page }) {
  return (
    <>
      <Seo title={page.title} description={page.intro} path={page.slug}
        schema={breadcrumbSchema([{ name: 'Home', to: '/' }, { name: page.title, to: page.slug }])} />
      <PageHero
        eyebrow="Legal"
        title={page.title}
        subtitle={page.intro}
        breadcrumb={[{ name: 'Home', to: '/' }, { name: page.title, to: page.slug }]}
      />

      <section className="section bg-white">
        <Container className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* Desktop table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">On this page</p>
              <nav aria-label="Table of contents" className="mt-4">
                <ul className="space-y-2 border-l border-line">
                  {page.sections.map((s) => (
                    <li key={s.heading}>
                      <a href={`#${anchor(s.heading)}`} className="-ml-px block border-l-2 border-transparent pl-4 text-sm text-muted transition-colors hover:border-brand-400 hover:text-brand-700">{s.heading}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="mt-6 text-xs text-muted">Last updated <span className="font-semibold text-ink">{page.updated}</span></p>
            </div>
          </aside>

          {/* Content column */}
          <div className="max-w-prose">
            <p className="text-sm text-muted lg:hidden">Last updated <span className="font-semibold text-ink">{page.updated}</span></p>

            {page.callout && (
              <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                <p className="text-sm text-amber-900">{page.callout}</p>
              </div>
            )}

            <div className="space-y-10">
              {page.sections.map((s, i) => (
                <Reveal key={s.heading} as="article" id={anchor(s.heading)} className="scroll-mt-24">
                  <h2 className="font-display text-xl font-bold text-ink">
                    <span className="mr-2 font-extrabold text-pink-500">{String(i + 1).padStart(2, '0')}</span>{s.heading}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-line bg-surface p-7 text-center">
              <h2 className="text-lg font-bold tracking-tighter2">Questions about this policy?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">We&rsquo;re happy to help. Reach out and our team will respond.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button to="/contact" size="sm">Contact us</Button>
                <Button href={`mailto:${site.email}`} variant="secondary" size="sm">Email us</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
