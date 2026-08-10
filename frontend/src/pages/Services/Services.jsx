import { ArrowRight, Check } from 'lucide-react';
import Seo from '../../components/seo/Seo.jsx';
import { breadcrumbSchema } from '../../lib/seo.js';
import Container from '../../components/ui/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import Icon from '../../components/ui/Icon.jsx';
import Button from '../../components/ui/Button.jsx';
import PageHero from '../../components/sections/PageHero.jsx';
import CtaBand from '../../components/sections/CtaBand.jsx';
import { services } from '../../content/services.js';

// Rotating spectrum accents so no two adjacent rows share a color.
const accents = [
  { tint: 'bg-brand-50', ring: 'ring-brand-100', icon: 'bg-brand-600', text: 'text-brand-700', num: 'text-brand-200' },
  { tint: 'bg-green-50', ring: 'ring-green-100', icon: 'bg-green-600', text: 'text-green-700', num: 'text-green-200' },
  { tint: 'bg-pink-50', ring: 'ring-pink-100', icon: 'bg-pink-500', text: 'text-pink-700', num: 'text-pink-200' },
  { tint: 'bg-amber-50', ring: 'ring-amber-100', icon: 'bg-tangerine', text: 'text-tangerine', num: 'text-amber-200' },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        ogType="article"
        schema={breadcrumbSchema([{ name: 'Home', to: '/' }, { name: 'Services', to: '/services' }])}
      />
      <PageHero
        eyebrow="Our Services"
        title="ABA care tailored to your child"
        subtitle="Every child learns differently. Our services span assessment, therapy, and family support — each one built around your child’s strengths and goals."
        breadcrumb={[{ name: 'Home', to: '/' }, { name: 'Services', to: '/services' }]}
      />

      {/* Quick index */}
      <section className="border-b border-line bg-white">
        <Container>
          <ul className="flex flex-wrap gap-2.5 py-6">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-sm font-semibold text-ink/80 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">
                  <Icon name={s.icon} className="h-4 w-4 text-brand-500" /> {s.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Alternating editorial rows */}
      {services.map((s, i) => {
        const a = accents[i % accents.length];
        const flip = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={`section scroll-mt-24 ${flip ? 'bg-surface' : 'bg-white'}`}>
            <Container>
              <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                {/* Visual */}
                <Reveal>
                  <div className={`relative overflow-hidden rounded-3xl ${a.tint} p-6 shadow-soft ring-1 ${a.ring}`}>
                    <span className={`pointer-events-none absolute right-6 top-4 font-display text-7xl font-extrabold ${a.num}`} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                  </div>
                </Reveal>

                {/* Content */}
                <Reveal delay={0.1}>
                  <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] ${a.text}`}>
                    <span className={`grid h-8 w-8 place-items-center rounded-lg ${a.icon} text-white`}>
                      <Icon name={s.icon} className="h-4 w-4" />
                    </span>
                    {s.category}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tighter2 md:text-[2.25rem]">{s.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{s.short}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.whatWeProvide.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${a.text}`} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button to={`/services/${s.slug}`} className="mt-8">
                    Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      <CtaBand title="Not sure where to start?" text="Tell us about your child and we’ll help you find the right path — with no pressure." />
    </>
  );
}
